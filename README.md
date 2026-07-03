# OceanGuard

### Marine Pollution Incident Management & Reporting System

[![GitHub](https://img.shields.io/badge/GitHub-OceanGuard-blue?logo=github)](https://github.com/mohdshahjada3-star/ocean-guardian)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()
[![SDG 14](https://img.shields.io/badge/SDG-14%20Life%20Below%20Water-0066cc)]()

**OceanGuard** is a comprehensive full-stack web platform designed to combat marine pollution through real-time incident reporting, advanced analytics, and automated stakeholder notifications. Built in collaboration with MARS NGO to support UN Sustainable Development Goal 14.

---

## 🌊 Project Overview

OceanGuard bridges the gap between environmental citizens and conservation organizations by providing an intuitive platform for reporting marine pollution incidents in real-time. The system leverages cloud infrastructure, geospatial data, and automated notifications to enable rapid response to ocean pollution threats.

### Core Capabilities

#### 👥 For Citizens & Observers
- **Intuitive Incident Reporting**: One-click pollution report submission with guided form
- **Location Mapping**: Interactive map-based location selection using Leaflet.js
- **Image Documentation**: Upload high-resolution incident photos to Firebase Storage
- **Real-Time Confirmation**: Instant acknowledgment of report submission

#### 🏢 For NGO Staff & Administrators
- **Real-Time Dashboard**: Live incident tracking with status management and filtering
- **3D Visualization Interface**: Three.js powered interactive 3D ocean environment showcasing incidents
- **Advanced Analytics**: Chart.js powered visualizations for incident trends, severity distribution, and temporal patterns
- **Automated Email Alerts**: Instant email notifications to admin team when new incidents are reported
- **Role-Based Access Control**: Secure admin panel with authentication and authorization
- **Incident Management**: Update statuses, assign priorities, and track resolution progress

#### 🔔 Automated Notification System
- **Real-Time Email Alerts**: Nodemailer integration sends immediate notifications to admin email
- **Rich Email Content**: Includes incident details, location info, reporter contact, and dashboard links
- **SMTP Configuration**: Supports Gmail, SendGrid, AWS SES, and custom SMTP servers
- **Customizable Recipients**: Configure alert distribution to multiple stakeholders

---

## 🎨 3D Ocean Dashboard

The admin dashboard features an innovative **Three.js-powered 3D ocean visualization** that:
- Displays incident locations as interactive markers in a 3D ocean environment
- Provides immersive spatial awareness of pollution hotspots
- Combines 3D visualization with real-time data analytics
- Creates engaging visual representation of marine conservation efforts

---

## 💻 Technology Stack

### Backend Architecture
```
Express.js (Node.js)
├── Firebase Admin SDK
├── Firestore Database
├── Cloud Storage
└── Nodemailer (Email Service)
```

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Node.js v14+ | Server execution |
| **Framework** | Express.js | REST API & routing |
| **Database** | Firebase Firestore | Real-time NoSQL database |
| **Storage** | Firebase Cloud Storage | Image upload & retrieval |
| **Authentication** | Firebase Auth + JWT | Secure user access |
| **Notifications** | Nodemailer | Email alert delivery |
| **Port** | 5000 (configurable) | Server port |

### Frontend Architecture
```
Single Page Application (HTML5/CSS3/JavaScript)
├── Three.js - 3D Visualizations
├── Leaflet.js - Map Integration
├── Chart.js - Analytics & Reporting
└── Firebase SDK - Real-time sync
```

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **UI** | HTML5 / CSS3 / Vanilla JS | Responsive interface |
| **3D Graphics** | Three.js | Interactive 3D ocean scene |
| **Mapping** | Leaflet.js | Geolocation & incident mapping |
| **Analytics** | Chart.js | Data visualization & dashboards |
| **Database Sync** | Firebase Client SDK | Real-time data updates |

---

## 📁 Project Structure

```
ocean-guardian/
│
├── ocean-guardian-backend/
│   ├── server.js                 # Express server & API routes
│   ├── model.js                  # Firestore schema & database logic
│   ├── package.json              # Node.js dependencies
│   ├── package-lock.json         # Dependency lock file
│   ├── .env                      # Environment variables (git-ignored)
│   ├── serviceAccountKey.json    # Firebase credentials (git-ignored)
│   ├── uploads/                  # Incident image storage (git-ignored)
│   └── .gitignore                # Git exclusion rules
│
├── ocean-guardian-frontend/
│   ├── index.html                # Single-page application UI
│   └── ocean_bg.png              # Marine background asset
│
└── README.md                      # This file
```

---

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** 6.0+
- **Firebase Project** with Firestore & Storage enabled
- **Gmail Account** (for email notifications) or SMTP server access
- **Git** for version control

### Installation Steps

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/mohdshahjada3-star/ocean-guardian.git
cd ocean-guardian
```

#### 2️⃣ Backend Configuration

```bash
cd ocean-guardian-backend
npm install
```

##### Create `.env` File

Create a new file named `.env` in `ocean-guardian-backend/` with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef1234567890abcdef

# Email Configuration (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
ADMIN_EMAIL=admin@oceanguard.org
ADMIN_NAME=OceanGuard Admin Team

# Optional: For custom SMTP
# SMTP_HOST=mail.example.com
# SMTP_PORT=587
# SMTP_USER=user@example.com
# SMTP_PASS=password
```

**⚠️ Important:** Never commit `.env` to GitHub. It's automatically excluded by `.gitignore`.

##### Firebase Service Account Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Project Settings** → **Service Accounts**
4. Click **Generate new private key**
5. Save the downloaded JSON file as `serviceAccountKey.json` in `ocean-guardian-backend/`
6. **Keep this file secret** — it's git-ignored for security

##### Gmail App Password (For Email Alerts)

If using Gmail for SMTP:

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app-specific password for "Mail"
4. Use this password in `SMTP_PASS` in your `.env`

#### 3️⃣ Start Backend Server

```bash
npm start
```

**Expected Output:**
```
OceanGuard API is running 🌊
OceanGuard Server running on http://localhost:5000
Open the app at http://localhost:5000 (frontend + API on one server)
```

#### 4️⃣ Access Frontend

Open your browser and navigate to:
```
http://localhost:5000
```

---

## 📊 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Health Check
```http
GET /api/health
```
**Response:** `{ status: "OceanGuard API is running" }`

#### Submit Incident Report
```http
POST /api/reports
Content-Type: application/json

{
  "title": "Oil Spill in Coastal Waters",
  "description": "Large oil slick observed near marine sanctuary",
  "location": {
    "latitude": 19.0760,
    "longitude": 72.8777
  },
  "reporterName": "John Doe",
  "reporterEmail": "john@example.com",
  "reporterPhone": "+91 9876543210",
  "incidentType": "Oil Spill",
  "severity": "High"
}
```

#### Retrieve All Reports (Admin)
```http
GET /api/reports
Authorization: Bearer <jwt_token>
```

#### Update Report Status (Admin)
```http
PUT /api/reports/:reportId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "Under Review",
  "notes": "Field team dispatched for investigation"
}
```

#### Delete Report (Admin)
```http
DELETE /api/reports/:reportId
Authorization: Bearer <jwt_token>
```

---

## 📧 Email Notification System

### How It Works

When a new incident is reported, an automated email is triggered:

1. **Trigger Event**: User submits incident report via web form
2. **Data Processing**: Backend validates and stores in Firestore
3. **Email Generation**: Nodemailer creates formatted HTML email
4. **Delivery**: Email sent to configured admin address via SMTP
5. **Tracking**: Email sent log stored for audit trail

### Email Template Content

```
Subject: 🚨 New Marine Pollution Incident Report

To: admin@oceanguard.org

Dear OceanGuard Team,

A new marine pollution incident has been reported:

INCIDENT DETAILS
├─ Title: Oil Spill in Coastal Waters
├─ Type: Oil Spill
├─ Severity: High
├─ Description: Large oil slick observed near marine sanctuary
└─ Time: 2026-07-04 01:30:00 UTC

LOCATION
├─ Latitude: 19.0760°N
├─ Longitude: 72.8777°E
└─ Map: [Link to Map View]

REPORTER INFORMATION
├─ Name: John Doe
├─ Email: john@example.com
└─ Phone: +91 9876543210

VIEW & MANAGE: https://your-domain.com/admin/reports

Take action now!
- Review incident details
- Assess severity
- Dispatch response team
- Update incident status

Best regards,
OceanGuard System
```

---

## 🗄️ Firestore Database Schema

### Collections & Documents

#### `reports` Collection

```javascript
reports/
├── [report-id-001]
│   ├── id: string (unique identifier)
│   ├── title: string ("Oil Spill in Coastal Waters")
│   ├── description: string (detailed incident description)
│   ├── incidentType: string ("Oil Spill" | "Debris" | "Chemical" | "Other")
│   ├── severity: string ("Low" | "Medium" | "High" | "Critical")
│   ├── status: string ("Pending" | "Under Review" | "In Progress" | "Resolved")
│   ├── location: object
│   │   ├── latitude: number
│   │   ├── longitude: number
│   │   └── address: string (reverse geocoded)
│   ├── imageUrl: string (Firebase Storage path)
│   ├── reporterName: string
│   ├── reporterEmail: string
│   ├── reporterPhone: string
│   ├── timestamp: timestamp (ISO 8601)
│   ├── createdBy: string (user UID)
│   ├── adminNotes: string (internal comments)
│   └── resolvedDate: timestamp (when marked resolved)
└── [report-id-002]
    └── {...}
```

---

## 🔐 Security Features

### Authentication & Authorization
- **Firebase JWT**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Separate permissions for citizen and admin roles
- **Session Management**: Automatic token validation on API requests

### Data Protection
- **Environment Variables**: Sensitive keys stored locally, never committed
- **Firebase Security Rules**: Collection-level access restrictions
- **HTTPS**: Production deployment requires SSL/TLS
- **Input Validation**: Server-side validation of all user inputs

### File Upload Security
- **File Type Validation**: Only image formats accepted
- **Size Limits**: Maximum file size restrictions
- **Virus Scanning**: Firebase Storage scans all uploads
- **Access Control**: Private storage with authenticated access

---

## 📈 Dashboard Features

### Admin Dashboard Components

#### 1. Real-Time Incident Feed
- Live list of submitted incidents
- Sortable by date, severity, type, location
- Quick-action buttons for status updates

#### 2. 3D Ocean Visualization
- Interactive Three.js 3D ocean scene
- Incident markers with color-coding by severity
- Zoom, pan, rotate controls
- Hover tooltips showing incident summary

#### 3. Analytics Dashboard
- Incident trend line chart (past 30 days)
- Severity distribution pie chart
- Incident type breakdown bar chart
- Resolution time metrics
- Geographic heatmap of pollution hotspots

#### 4. Incident Management Panel
- View full incident details
- Update status and priority
- Add internal notes and comments
- Assign to response teams
- Generate incident reports

---

## 🌍 SDG 14 Alignment

**UN Sustainable Development Goal 14: Life Below Water**

OceanGuard directly contributes to:

| SDG Target | How OceanGuard Helps |
|-----------|-------------------|
| **14.1** Prevent & reduce marine pollution | Real-time reporting enables rapid response to incidents |
| **14.2** Protect & restore marine ecosystems | Data-driven insights guide conservation efforts |
| **14.5** Conserve coastal areas | Identifies pollution hotspots for targeted action |
| **14.A** Research & technology transfer | Provides marine environmental data for research |

---

## 🚢 Deployment Guide

### Deploy Backend to Render

1. **Create Render Account**: Visit [render.com](https://render.com)
2. **Connect GitHub**: Authorize GitHub integration
3. **Create Web Service**:
   - Select `ocean-guardian` repository
   - Set **Root Directory**: `ocean-guardian-backend`
   - Set **Build Command**: `npm install`
   - Set **Start Command**: `node server.js`
4. **Add Environment Variables**:
   - Copy all values from local `.env`
   - Paste into Render dashboard
5. **Deploy**: Click Deploy button

**Backend URL**: `https://your-app.onrender.com`

### Deploy Frontend to Vercel

1. **Create Vercel Account**: Visit [vercel.com](https://vercel.com)
2. **Import Project**:
   - Connect GitHub
   - Select `ocean-guardian` repository
3. **Configure**:
   - Set **Root Directory**: `ocean-guardian-frontend`
   - No build command needed
4. **Deploy**: Click Deploy

**Frontend URL**: `https://your-app.vercel.app`

### Post-Deployment Configuration

Update frontend API calls to use Render backend URL:

In `ocean-guardian-frontend/index.html`, change:
```javascript
const API_BASE_URL = "https://your-app.onrender.com";
```

---

## 🛠️ Development & Contributing

### Local Development Workflow

```bash
# Terminal 1: Backend
cd ocean-guardian-backend
npm start

# Terminal 2: Frontend (separate browser window)
cd ocean-guardian-frontend
# Open index.html in browser
```

### Making Changes

1. Create feature branch:
   ```bash
   git checkout -b feature/incident-filters
   ```

2. Make changes and test locally

3. Commit with clear messages:
   ```bash
   git commit -m "Add date range filtering to incident dashboard"
   ```

4. Push and create Pull Request:
   ```bash
   git push origin feature/incident-filters
   ```

### Code Style Guidelines

- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and modular
- Test changes before committing

---

## 📋 Testing

### Manual Testing Checklist

- [ ] Submit incident report with all fields
- [ ] Verify email notification arrives in admin inbox
- [ ] Check incident appears in admin dashboard within 5 seconds
- [ ] Verify 3D ocean visualization shows new marker
- [ ] Update incident status and confirm change persists
- [ ] Upload image and verify it displays in report
- [ ] Test location mapping accuracy
- [ ] Verify email contains clickable dashboard link

### Automated Testing (Future)

- Unit tests: Jest
- Integration tests: Supertest
- E2E tests: Cypress
- Coverage target: 80%+

---

## 🔄 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check Node.js version, ensure .env file exists |
| **Emails not sending** | Verify SMTP credentials, check Gmail app password, whitelist server IP |
| **Firebase connection fails** | Verify `serviceAccountKey.json` path, check Firestore rules |
| **3D visualization not loading** | Clear browser cache, ensure Three.js library loads |
| **Image upload fails** | Check Firebase Storage rules, verify file size < 10MB |

---

## 🌟 Future Enhancements

- [ ] Mobile app (React Native / Flutter)
- [ ] SMS notifications in addition to email
- [ ] AI-powered incident categorization
- [ ] Predictive analytics for pollution patterns
- [ ] Integration with government environmental agencies
- [ ] Offline reporting with automatic sync
- [ ] Multi-language support (Hindi, Spanish, etc.)
- [ ] Video incident reporting
- [ ] Community ranking and leaderboards
- [ ] Real-time incident clustering on map

---

## 📞 Support & Documentation

- **Issues**: Report via GitHub Issues
- **Discussions**: GitHub Discussions for questions
- **Email**: Contact development team
- **Documentation**: See README sections above

---

## 📜 License

This project is open source and available under the MIT License.

---

## 👥 Team & Acknowledgments

| Role | Name | Organization |
|------|------|--------------|
| **Developer** | Shahjada | IILM University |
| **Partner NGO** | MARS | Marine And River Solutions |
| **Academic Advisor** | IILM Faculty | IILM University |

---

## 🙏 Acknowledgments

- **UN SDG 14**: Inspiration for marine conservation mission
- **Firebase**: Cloud infrastructure and services
- **Three.js**: 3D visualization technology
- **Leaflet**: Open-source mapping library
- **Chart.js**: Data visualization framework
- **Nodemailer**: Email delivery system

---

**Made with 🌊 for ocean conservation and marine sustainability**

---

### Repository Stats

![GitHub stars](https://img.shields.io/github/stars/mohdshahjada3-star/ocean-guardian?style=social)
![GitHub forks](https://img.shields.io/github/forks/mohdshahjada3-star/ocean-guardian?style=social)
![Last commit](https://img.shields.io/github/last-commit/mohdshahjada3-star/ocean-guardian)

**Join the mission to protect our oceans! 🌊**
