const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : require(path.join(__dirname, 'serviceAccountKey.json'));
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Master admin credentials (lets your professor / MARS team log in to the
// admin dashboard immediately, without needing a seeded Firestore user doc).
// Set these in .env — never hardcode real credentials here.
const MASTER_ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const MASTER_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// ================= FIREBASE =================

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log("✅ Firebase Connected");

// ================= CLOUDINARY =================
// Report images are uploaded here instead of local disk, so they survive
// server restarts/redeploys on hosts with ephemeral filesystems (e.g. Render
// free tier). Set these three in .env — get them from your Cloudinary
// dashboard homepage.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  console.log("✅ Cloudinary Connected");
} else {
  console.log("⚠️  Cloudinary not configured — set CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET in .env, image uploads will fail");
}

// ================= GROQ (GPT-OSS) ORG SUGGESTIONS =================
// For every report, we ask GPT-OSS (hosted for free/fast inference on Groq)
// to suggest real, well-known organizations relevant to the incident and,
// only if it's confident, their public social handles — so admins (and the
// reporter) know who might be worth tagging or notifying.
//
// Get a free key at https://console.groq.com/keys and set GROQ_API_KEY in
// .env. Without a key, suggestions are simply skipped (status: "unavailable")
// and the rest of the app works exactly as before.

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

if (GROQ_API_KEY) {
  console.log(`✅ Groq (GPT-OSS) connected — model: ${GROQ_MODEL}`);
} else {
  console.log("⚠️  GROQ_API_KEY not set — organization suggestions will be skipped");
}

// Asks GPT-OSS for up to 5 real organizations relevant to this incident.
// The model is explicitly told to omit a handle rather than guess one, but
// this is still a starting point, not a verified directory — the frontend
// always labels it "AI-suggested" and nothing gets auto-posted anywhere.
async function suggestOrganizations(category, location, description) {
  if (!GROQ_API_KEY) {
    return { status: "unavailable", organizations: [], updatedAt: new Date().toISOString() };
  }

  const userPrompt = `Incident category: ${category || "Unspecified"}
Location: ${location || "Not specified"}
Description: ${description || "N/A"}

Suggest up to 5 real, well-known organizations (NGOs, coast guards, government environmental bodies, or marine research groups) relevant to responding to or being notified about this marine pollution incident. Prefer organizations local to the given location when possible, alongside major international ones.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        max_tokens: 2048,
        // gpt-oss "thinks" before answering, and those reasoning tokens eat
        // into the same budget as the final answer. Keeping reasoning low
        // leaves enough room for the model to actually finish the JSON
        // instead of getting cut off mid-answer (which is what was causing
        // the "Unexpected end of JSON input" failures).
        reasoning_effort: "low",
        messages: [
          {
            role: "system",
            content: "You are a research assistant for a marine pollution reporting platform. You suggest real, well-known organizations and, only if you are genuinely confident, their public social media handles. Never invent or guess a handle — use null if you are not sure. Respond with ONLY raw JSON, no markdown fences, no commentary, in exactly this shape: {\"organizations\":[{\"name\":\"string\",\"type\":\"NGO | Government | Coast Guard | Research | Local Authority\",\"reason\":\"one short sentence\",\"handles\":{\"twitter\":\"@handle or null\",\"instagram\":\"@handle or null\"}}]}"
          },
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      console.error("Groq API error:", response.status, await response.text());
      return { status: "failed", organizations: [], updatedAt: new Date().toISOString() };
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";
    let cleaned = raw.replace(/```json|```/g, "").trim();

    if (!cleaned) {
      console.error("suggestOrganizations: empty response from Groq (finish_reason:", data.choices?.[0]?.finish_reason, ")");
      return { status: "failed", organizations: [], updatedAt: new Date().toISOString() };
    }

    // Some models still add a stray sentence before/after the JSON despite
    // instructions — pull out just the {...} block rather than fail on it.
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) cleaned = jsonMatch[0];

    const parsed = JSON.parse(cleaned);

    return {
      status: "ready",
      organizations: Array.isArray(parsed.organizations) ? parsed.organizations.slice(0, 5) : [],
      updatedAt: new Date().toISOString()
    };
  } catch (err) {
    console.error("suggestOrganizations failed:", err.message);
    return { status: "failed", organizations: [], updatedAt: new Date().toISOString() };
  }
}

// ================= EMAIL NOTIFICATIONS =================
// Emails the reporter when an admin moves their report to "in_progress"
// or "resolved". Configure EMAIL_USER / EMAIL_PASS in .env to enable —
// EMAIL_PASS should be a Gmail "App Password", not your real password.

let mailer = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log("✅ Email notifications enabled");
} else {
  console.log("ℹ️  Email notifications disabled — set EMAIL_USER/EMAIL_PASS in .env to enable");
}

async function sendStatusEmail(report, status) {
  if (!mailer || !report.userEmail) return;

  const isResolved = status === "resolved";

  const subject = isResolved
    ? "✅ Your OceanGuard Report Has Been Resolved"
    : "🔎 Your OceanGuard Report Is In Progress";

  const headline = isResolved
    ? "Great news — your report has been resolved!"
    : "Your report is now being investigated by our team.";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background:#0a1f2d; color:#ffffff; border-radius:12px;">
      <h2 style="color:#00d2ff; margin: 0 0 12px;">🌊 OceanGuard</h2>
      <p style="font-size:15px;">Hi ${report.reportedBy || "there"},</p>
      <p style="font-size:15px; line-height:1.6;">${headline}</p>
      <div style="background:rgba(0,210,255,0.08); border:1px solid rgba(0,210,255,0.3); border-radius:10px; padding:16px; margin:16px 0;">
        <p style="margin:4px 0; font-size:13px;"><strong>Category:</strong> ${report.category || "N/A"}</p>
        <p style="margin:4px 0; font-size:13px;"><strong>Location:</strong> ${report.location || "N/A"}</p>
        <p style="margin:4px 0; font-size:13px;"><strong>Status:</strong> ${isResolved ? "Resolved ✅" : "In Progress 🔎"}</p>
        ${report.adminNotes ? `<p style="margin:4px 0; font-size:13px;"><strong>Notes from our team:</strong> ${report.adminNotes}</p>` : ""}
      </div>
      <p style="font-size:12px; color:rgba(255,255,255,0.55);">Thank you for helping protect our oceans. — The OceanGuard Team</p>
    </div>
  `;

  try {
    await mailer.sendMail({
      from: `"OceanGuard" <${process.env.EMAIL_USER}>`,
      to: report.userEmail,
      subject,
      html
    });
    console.log(`📧 Status email sent to ${report.userEmail} (${status})`);
  } catch (err) {
    console.error("Email send failed:", err.message);
  }
}

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
  extended: true,
  limit: "50mb"
}));

// NOTE: local /uploads static route removed — images now live on Cloudinary
// and are served from Cloudinary's own URLs, not from this server.

// Serve the merged single-page frontend (index.html) from the same server,
// so the site + API live on one origin — no separate frontend host needed.
// Caching is disabled so the browser always loads the latest version instead
// of an old cached copy (important while the project is still being edited).
app.use(express.static(path.join(__dirname, "..", "ocean-guardian-frontend"), {
  etag: false,
  lastModified: false,
  setHeaders: (res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  }
}));

// ================= MULTER (CLOUDINARY STORAGE) =================
// Uploaded report images are streamed straight to Cloudinary instead of
// being written to local disk, so they survive server restarts/redeploys.

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "oceanguard-reports",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const upload = multer({ storage });

// ================= JWT AUTH =================

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "No token provided"
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {

    if (err) {
      return res.status(403).json({
        error: "Invalid token"
      });
    }

    req.user = user;
    next();

  });

};

// Only lets requests through if the JWT belongs to an admin.
// Use this on any route that shows or changes report data in the dashboard.
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    error: "Admin access required"
  });
};

// ================= REGISTER =================

app.post("/api/auth/register", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    const usersRef = db.collection("users");

    const existing = await usersRef
      .where("email", "==", email)
      .get();

    if (!existing.empty) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDoc = await usersRef.add({
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date()
    });

    const token = jwt.sign(
      {
        userId: userDoc.id,
        email,
        role: "user"
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      message: "Registration Successful",
      token,
      userId: userDoc.id
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ================= LOGIN =================

app.post("/api/auth/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    // ---- Master admin bypass ----
    // Lets the NGO/admin team log in even before any admin user exists
    // in Firestore. Configure ADMIN_EMAIL / ADMIN_PASSWORD in .env.
    if (
      MASTER_ADMIN_EMAIL &&
      MASTER_ADMIN_PASSWORD &&
      email === MASTER_ADMIN_EMAIL &&
      password === MASTER_ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { userId: "master-admin", email, role: "admin" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Login Successful",
        token,
        userId: "master-admin",
        email,
        role: "admin"
      });
    }

    const usersRef = db.collection("users");

    const snapshot = await usersRef
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    const userDoc = snapshot.docs[0];

    const user = userDoc.data();

    const valid = await bcryptjs.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: userDoc.id,
        email,
        role: user.role || "user"
      },
      JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login Successful",
      token,
      userId: userDoc.id,
      email,
      role: user.role || "user"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});
// ================= CREATE REPORT =================
// Public — anyone (a citizen) can file an incident report, no login needed.

app.post("/api/reports", upload.single("image"), async (req, res) => {
  try {
    const {
      reportedBy,
      category,
      severity,
      description,
      location,
      latitude,
      longitude,
      userEmail
    } = req.body;

    // Name, email, category, and a photo are the true blockers now — location
    // and the map pin are a nice-to-have so a citizen can still file a report
    // even if they can't pin the exact spot or don't know its name.
    if (
      !userEmail ||
      !reportedBy ||
      !category ||
      !req.file
    ) {
      return res.status(400).json({
        error: "Name, email, category and a photo are required"
      });
    }

    // req.file.path is the full hosted Cloudinary URL (e.g.
    // https://res.cloudinary.com/.../oceanguard-reports/xyz.jpg) when an
    // image was uploaded, since multer-storage-cloudinary uploads the file
    // and puts the resulting secure URL here.
    const imageUrl = req.file.path;

    const report = {
      userId: "guest",
      reportedBy,
      userEmail,
      category,
      severity: severity ? parseInt(severity) : 1,
      description: description || "",
      location: location || "Not specified",
      coordinates: (latitude && longitude) ? {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      } : null,
      imageUrl,
      status: "pending",
      orgSuggestions: { status: "pending", organizations: [], updatedAt: null },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection("reports").add(report);

    res.status(201).json({
      message: "Report submitted successfully",
      report: {
        id: docRef.id,
        ...report
      }
    });

    // Fire-and-forget: the citizen shouldn't have to wait on an LLM call to
    // submit their report. We update the doc in the background once the
    // suggestions are ready; the confirmation screen and admin panel both
    // poll GET /api/reports/:id/organizations to pick it up.
    suggestOrganizations(report.category, report.location, report.description)
      .then(result => docRef.update({ orgSuggestions: result }))
      .catch(err => console.error("Org suggestion background update failed:", err.message));

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ================= GET ORG SUGGESTIONS =================
// Public — the citizen confirmation screen polls this right after
// submitting (no login yet at that point), and the admin panel uses it too.
// Only exposes the suggestion list, not the rest of the report.

app.get("/api/reports/:id/organizations", async (req, res) => {
  try {
    const doc = await db.collection("reports").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(doc.data().orgSuggestions || { status: "pending", organizations: [], updatedAt: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= REFRESH ORG SUGGESTIONS =================
// Admin-only — lets an admin force a fresh GPT-OSS lookup for a report,
// e.g. if the first attempt failed or the report was edited.

app.post("/api/reports/:id/organizations/refresh", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const docRef = db.collection("reports").doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Report not found" });
    }

    const data = doc.data();
    const result = await suggestOrganizations(data.category, data.location, data.description);
    await docRef.update({ orgSuggestions: result });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET ALL REPORTS =================
// Admin-only — this is the data that populates the admin dashboard.

app.get("/api/reports", authenticateToken, requireAdmin, async (req, res) => {
  try {

    const snapshot = await db
      .collection("reports")
      .orderBy("createdAt", "desc")
      .get();

    const reports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(reports);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

// ================= GET SINGLE REPORT =================
// Admin-only — a report contains the reporter's name/email, so it's private.

app.get("/api/reports/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {

    const doc = await db
      .collection("reports")
      .doc(req.params.id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({
        error: "Report not found"
      });
    }

    res.json({
      id: doc.id,
      ...doc.data()
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});
// ================= UPDATE REPORT =================
// Admin-only — mark resolved / add admin notes.

const VALID_STATUSES = ["pending", "in_progress", "resolved"];

app.patch("/api/reports/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {

    const { status, adminNotes } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: "Status must be one of: pending, in_progress, resolved"
      });
    }

    const docRef = db.collection("reports").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        error: "Report not found"
      });
    }

    const previousStatus = doc.data().status;
    const statusChanged = previousStatus !== status;

    const updateData = {
      status,
      updatedAt: new Date()
    };

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    const updatedReport = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    };

    // Notify the reporter by email when their report moves forward
    if (statusChanged && (status === "in_progress" || status === "resolved")) {
      sendStatusEmail(updatedReport, status);
    }

    res.json({
      message: "Report updated successfully",
      report: updatedReport
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

// ================= DELETE REPORT =================
// Admin-only.

app.delete("/api/reports/:id", authenticateToken, requireAdmin, async (req, res) => {

  try {

    const doc = await db
      .collection("reports")
      .doc(req.params.id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({
        error: "Report not found"
      });
    }

    await db
      .collection("reports")
      .doc(req.params.id)
      .delete();

    res.json({
      message: "Report deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ================= FILTER REPORTS =================
// Admin-only (same data sensitivity as the list endpoint above).

app.get("/api/reports/filter/:type", authenticateToken, requireAdmin, async (req, res) => {

  try {

    const type = req.params.type;

    let query = db.collection("reports");

    if (type === "pending") {
      query = query.where("status", "==", "pending");
    }

    if (type === "resolved") {
      query = query.where("status", "==", "resolved");
    }

    if (type === "high") {
      query = query.where("severity", "==", 3);
    }

    const snapshot = await query.get();

    const reports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(reports);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// ================= HEALTH CHECK =================

app.get("/api/health", (req, res) => {

  res.json({
    status: "OceanGuard API is running ✅"
  });

});

// ================= START SERVER =================

app.listen(PORT, () => {
  console.log(`🌊 OceanGuard Server running on http://localhost:${PORT}`);
  console.log(`🌐 Open the app at http://localhost:${PORT} (frontend + API on one server)`);
});