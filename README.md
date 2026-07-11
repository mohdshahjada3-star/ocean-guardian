<div align="center">

# 🌊 OceanGuard

### Marine Pollution Incident Management & Reporting System

Protecting Oceans Through Community Reporting & Smart Incident Management

![Version](https://img.shields.io/badge/Version-2.0-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
![Platform](https://img.shields.io/badge/Platform-Web-orange)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Firebase](https://img.shields.io/badge/Firebase-Database-yellow)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![SDG 14](https://img.shields.io/badge/UN%20SDG-14%20Life%20Below%20Water-0A97D9)

**OceanGuard empowers citizens to report marine pollution incidents in real time while enabling authorities to monitor, manage, and resolve environmental issues through an intelligent web platform.**

</div>

---

# 🌍 Problem Statement

Marine pollution caused by plastic waste, oil spills, chemical discharge, and other contaminants is severely affecting marine ecosystems. Many pollution incidents go unreported or are reported too late, resulting in delayed action and greater environmental damage.

OceanGuard provides a centralized platform where citizens can instantly report marine pollution incidents with images and location details, allowing authorities to take faster and more effective action.

---

# 💡 Solution

OceanGuard is a full-stack web application that connects citizens and administrators through a real-time marine pollution reporting system.

Citizens can submit pollution reports with images and location details, while administrators can monitor reports, update their status, analyze trends, and notify users automatically through email.

The platform also integrates the **GPT-OSS** model to suggest official social media handles of relevant organizations so incidents can be shared with the appropriate authorities.

---

# ✨ Features

## 👤 Citizen Portal

- Secure Registration & Login
- Report Marine Pollution Incidents
- Upload Pollution Images
- Interactive Map Location Selection
- Search Location
- GPS Support
- Incident History
- Track Report Status
- Email Notifications
- GPT-OSS Social Media Handle Suggestions
- Responsive User Interface

---

## 🛡️ Admin Portal

- Secure Admin Login
- Dashboard Analytics
- View All Reports
- Incident Filtering
- Status Management
- Pending Reports
- In Progress Reports
- Resolved Reports
- High Severity Detection
- Delete Reports
- Email Notifications
- GPT-OSS Suggestions

---

# 🤖 GPT-OSS Integration

OceanGuard integrates the **GPT-OSS** model to intelligently suggest official social media handles of important organizations related to a reported pollution incident.

Examples include:

- Pollution Control Board
- Coast Guard
- Municipal Corporation
- Environmental NGOs
- Disaster Management Authorities

These suggestions help users and administrators quickly identify organizations that may need to be informed.

---

# 📧 Email Notification System

Automatic emails are sent when:

- Report is Submitted
- Report is Under Review
- Report Status changes to In Progress
- Report is Resolved

This keeps citizens updated without repeatedly checking the application.

---

# 🗺️ Map Features

- Interactive Map
- Search Any Location
- GPS Support
- Marker Placement
- Latitude & Longitude Storage
- OpenStreetMap Integration using Leaflet
- Easily upgradeable to Google Maps API

---

# ☁️ Cloud Storage

OceanGuard stores uploaded images securely using:

- Cloudinary
- Firebase Storage

---

# 🔥 Firebase Services

- Firebase Authentication
- Firestore Database
- Firebase Storage
- Secure Authentication
- Real-Time Database

---

# 📊 Admin Dashboard

The Admin Dashboard provides:

- Total Reports
- Pending Reports
- In Progress Reports
- Resolved Reports
- High Severity Reports
- Report Details
- Filtering
- Incident Management

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Leaflet.js
- Chart.js

## Backend

- Node.js
- Express.js

## Database

- Firebase Firestore

## Authentication

- Firebase Authentication
- JWT

## Cloud

- Cloudinary

## Email

- Nodemailer

## AI

- GPT-OSS

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
OceanGuard

├── frontend
│
├── backend
│
├── uploads
│
├── screenshots
│
├── server.js
│
├── package.json
│
└── README.md
```

---

# ⚙️ Installation

Clone Repository

```bash
git clone https://github.com/mohdshahjada3-star/ocean-guardian.git
```

Go into project

```bash
cd ocean-guardian
```

Install dependencies

```bash
npm install
```

Run backend

```bash
npm start
```

Open frontend using Live Server.

---

# 🔑 Environment Variables

Create a `.env` file

```env
PORT=5000

JWT_SECRET=your_secret

EMAIL_USER=your_email

EMAIL_PASS=your_password

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY=
```

---

# 🔄 System Workflow

```
Citizen Login
        │
        ▼
Submit Pollution Report
        │
        ▼
Upload Image
        │
        ▼
Select Map Location
        │
        ▼
Store in Firebase
        │
        ▼
Cloudinary Image Upload
        │
        ▼
Admin Dashboard
        │
        ▼
Status Updated
        │
        ▼
Email Notification
        │
        ▼
Citizen Receives Update
```

---

# 🏗 System Architecture

```
Citizen
    │
    ▼
Frontend (HTML, CSS, JavaScript)
    │
    ▼
Express Server (Node.js)
    │
    ├────────► Firebase Authentication
    │
    ├────────► Firestore Database
    │
    ├────────► Cloudinary Storage
    │
    └────────► GPT-OSS Suggestions
                    │
                    ▼
             Admin Dashboard
                    │
                    ▼
          Email Notification System
```

---

# 📸 Screenshots

## 🏠 Home Page

![Home](screenshots/home.png)

---

## 📝 Report Incident

![Report](screenshots/report.png)

---

## 📊 Admin Dashboard

![Dashboard](screenshots/admin-dashboard.png)

---

# 📈 Algorithms Used

| Algorithm | Purpose |
|------------|----------|
| JWT | Authentication |
| Bcrypt | Password Encryption |
| Firestore Indexing | Fast Data Retrieval |
| GPT-OSS | Social Media Suggestions |
| Sorting | Report Ordering |
| Filtering | Incident Search |

---

# 🌍 Sustainable Development Goal

## SDG 14 – Life Below Water

OceanGuard contributes towards SDG 14 by encouraging community participation in protecting oceans and reducing marine pollution.

---

# 🚀 Future Enhancements

- Google Maps API
- AI Image Classification
- Pollution Severity Prediction
- Mobile Application
- Push Notifications
- Heatmap Visualization
- IoT Sensor Integration
- Government API Integration
- Multi-language Support
- Offline Reporting

---

# 👨‍💻 Developed By

## Shahjada

B.Tech Computer Science Engineering

IILM University, Greater Noida

GitHub

https://github.com/mohdshahjada3-star

---

# 🤝 Contributing

Contributions, suggestions and improvements are always welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## 🌊 Protect Oceans Today for a Better Tomorrow

Made with ❤️ using HTML, CSS, JavaScript, Node.js, Express.js, Firebase, Cloudinary and GPT-OSS.

⭐ If you like this project, don't forget to star the repository.

</div>