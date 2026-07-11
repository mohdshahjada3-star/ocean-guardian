<div align="center">

# 🌊 OceanGuard

### Marine Pollution Incident Management & Reporting System

Empowering communities to protect ocean ecosystems through intelligent reporting, real-time monitoring, and collaborative incident management.

[![Version](https://img.shields.io/badge/Version-2.0-blue?style=flat-square)](https://github.com/mohdshahjada3-star/ocean-guardian)
[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)](https://github.com/mohdshahjada3-star/ocean-guardian)
[![Platform](https://img.shields.io/badge/Platform-Web-orange?style=flat-square)](https://github.com/mohdshahjada3-star/ocean-guardian)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![SDG 14](https://img.shields.io/badge/UN%20SDG-14%20Life%20Below%20Water-0A97D9?style=flat-square)](https://sdgs.un.org/goals/goal14)

[Live Demo](#) • [Documentation](#tech-stack) • [Features](#features) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [System Architecture](#-system-architecture)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview

**OceanGuard** is a full-stack web application that bridges the gap between citizens and environmental authorities. It enables real-time reporting of marine pollution incidents while providing administrators with intelligent tools to monitor, analyze, and coordinate response efforts.

The platform leverages modern cloud technologies and AI to streamline incident management and accelerate environmental action.

---

## 🚨 Problem Statement

Marine pollution is one of the most pressing environmental challenges:

- **Plastic Waste**: Millions of tons enter oceans annually
- **Oil Spills**: Catastrophic impact on marine biodiversity
- **Chemical Discharge**: Industrial waste contaminates ecosystems
- **Delayed Response**: Many incidents go unreported, reducing response effectiveness
- **Lack of Coordination**: Citizens and authorities lack centralized communication channels

**Current Impact:**
- Estimated 8 million tons of plastic enter oceans yearly
- Marine life affected in over 86% of the ocean's surface
- Response times delayed due to lack of real-time incident data

---

## 💡 Solution

OceanGuard creates a **unified ecosystem** for marine pollution management:

### For Citizens
- **Instant Reporting**: Submit pollution incidents in real-time
- **Visual Documentation**: Upload images for incident verification
- **GPS Integration**: Automatic location tagging for accuracy
- **Real-time Tracking**: Monitor incident status from submission to resolution
- **Email Updates**: Stay informed about incident progress

### For Administrators
- **Centralized Dashboard**: Monitor all incidents at a glance
- **Intelligent Analytics**: Identify pollution hotspots and trends
- **Status Management**: Track incident lifecycle from pending to resolved
- **AI Suggestions**: Auto-generate organization contacts using GPT-OSS
- **Report Management**: Comprehensive filtering and incident categorization

---

## ✨ Features

### 👤 Citizen Portal

| Feature | Description |
|---------|-------------|
| **Secure Authentication** | JWT-based login and registration |
| **Incident Reporting** | Submit marine pollution reports with details |
| **Image Upload** | Upload multiple pollution images via Cloudinary |
| **Location Selection** | Interactive map with GPS support |
| **Location Search** | Search and select pollution incident locations |
| **Incident History** | View all submitted reports and their status |
| **Real-time Tracking** | Monitor report progress from submission to resolution |
| **Email Notifications** | Automatic updates at each status change |
| **Social Media Suggestions** | AI-powered organization contact recommendations |
| **Responsive Design** | Optimized for desktop, tablet, and mobile |

### 🛡️ Admin Portal

| Feature | Description |
|---------|-------------|
| **Admin Authentication** | Secure admin-only login system |
| **Analytics Dashboard** | Visual statistics of all incidents |
| **Report Management** | View, filter, and manage all citizen reports |
| **Status Updates** | Change incident status (Pending → In Progress → Resolved) |
| **Severity Detection** | Automatic flagging of high-priority incidents |
| **Bulk Operations** | Delete and manage reports efficiently |
| **Email Notifications** | Notify citizens of status changes automatically |
| **Filtering & Search** | Advanced filtering by status, severity, and date |
| **Organization Suggestions** | AI-recommended contacts for incident notification |

### 🤖 AI Intelligence

**GPT-OSS Integration** intelligently suggests:
- Environmental Protection Agencies
- Pollution Control Boards
- Coast Guard and Maritime Authorities
- Municipal Environmental Departments
- International NGOs and Organizations

---

## 🛠 Tech Stack

### Frontend
```
HTML5 | CSS3 | Vanilla JavaScript
Bootstrap 5 | Leaflet.js | Chart.js | Three.js
```

### Backend
```
Node.js | Express.js
```

### Database & Authentication
```
Firebase Firestore | Firebase Authentication | JWT
```

### Cloud Services
```
Cloudinary (Image Storage) | Firebase Storage
```

### Communication
```
Nodemailer (Email Notifications)
```

### AI/ML
```
GPT-OSS (Organization Suggestions)
```

### Deployment
```
Render | Vercel
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended - [Download](https://code.visualstudio.com/)

### Required Accounts (Free Tier Available)
- Firebase Project - [Create](https://console.firebase.google.com/)
- Cloudinary Account - [Sign Up](https://cloudinary.com/)
- Email Account (Gmail recommended) - [Gmail](https://mail.google.com/)

---

## 📥 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/mohdshahjada3-star/ocean-guardian.git
cd ocean-guardian
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json`:
- express
- firebase-admin
- jsonwebtoken
- dotenv
- nodemailer
- multer
- cloudinary
- cors
- body-parser

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables (see Configuration section below):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_recommended

# Email Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=OceanGuard <noreply@oceanguard.com>

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# Admin Credentials (optional)
ADMIN_EMAIL=admin@oceanguard.com
ADMIN_PASSWORD=admin123
```

---

## ⚙️ Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "OceanGuard"
3. Enable Firestore Database:
   - Go to **Firestore Database**
   - Click **Create Database**
   - Start in **Production Mode**
   - Select region closest to you

4. Enable Firebase Authentication:
   - Go to **Authentication**
   - Click **Get Started**
   - Enable **Email/Password** authentication

5. Get Service Account Key:
   - Go to **Project Settings** → **Service Accounts**
   - Click **Generate New Private Key**
   - Download and keep safe
   - Add values to `.env` file

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to **Dashboard**
3. Copy your:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Add to `.env` file

### Email Configuration (Gmail)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Go to [Google Account](https://myaccount.google.com/)
   - Navigate to **Security** → **App passwords**
   - Select **Mail** and **Windows Computer** (or your device)
   - Copy the generated password
3. Add to `.env` file:
   ```env
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=generated_app_password
   ```

---

## 🚀 Running the Project

### Development Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

### In Another Terminal, Open Frontend

1. **Using Live Server (VS Code)**
   - Install Live Server extension
   - Right-click `index.html` → **Open with Live Server**
   - Opens on `http://127.0.0.1:5500`

2. **Using Python HTTP Server**
   ```bash
   python -m http.server 8000
   ```
   - Access at `http://localhost:8000`

3. **Using Node.js**
   ```bash
   npm install -g http-server
   http-server -p 8000
   ```

### Testing the Application

**Admin Credentials:**
```
Email: admin@oceanguard.com
Password: admin123
```

**Test Workflow:**
1. Register as a citizen
2. Submit a pollution report
3. Upload an image
4. Select location on map
5. Login as admin
6. View report on dashboard
7. Update status
8. Check email for notifications

---

## 📂 Project Structure

```
ocean-guardian/
├── ocean-guardian-frontend/          # Frontend files
│   ├── index.html                   # Main application page
│   ├── styles.css                   # Global styles
│   ├── script.js                    # Main JavaScript
│   ├── admin.js                     # Admin dashboard logic
│   ├── auth.js                      # Authentication logic
│   └── assets/                      # Images, icons, 3D models
│
├── backend/                         # Backend code
│   ├── server.js                    # Express server
│   ├── routes/                      # API routes
│   ├── middleware/                  # Authentication, validation
│   └── config/                      # Configuration files
│
├── uploads/                         # Temporary upload storage
│
├── screenshots/                     # Project documentation images
│
├── .env                            # Environment variables (create this)
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignore file
├── package.json                    # Dependencies
├── server.js                       # Main server file
└── README.md                       # Project documentation
```

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Citizen Form │  │  Admin Panel │  │ Map & Charts │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP/REST
┌─────────────────▼───────────────────────────────────────┐
│                    API LAYER                             │
│              Express.js Server (Node.js)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │Auth APIs │  │Report    │  │Admin Management APIs │  │
│  │(JWT)     │  │APIs      │  │                      │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
└─┬──────┬──────────┬──────────┬──────────┬───────────────┘
  │      │          │          │          │
  │      │          │          │          │
  ▼      ▼          ▼          ▼          ▼
┌────────────┐ ┌───────────┐ ┌──────────┐ ┌───────────┐
│ Firebase   │ │Cloudinary │ │ Nodemailer │ │ GPT-OSS │
│ Auth       │ │ Storage   │ │  Email     │ │Suggestions│
└────────────┘ └───────────┘ └──────────┘ └───────────┘
       │              │            │            │
       └──────┬───────┴────────────┴────────────┘
              │
        ┌─────▼──────┐
        │ Firestore  │
        │ Database   │
        └────────────┘
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Report Endpoints

#### Submit Report
```http
POST /reports/submit
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "type": "oil_spill",
  "description": "Oil spill detected",
  "latitude": "28.6139",
  "longitude": "77.2090",
  "image": <file>
}
```

#### Get User Reports
```http
GET /reports/user
Authorization: Bearer <token>
```

#### Get All Reports (Admin)
```http
GET /reports/all
Authorization: Bearer <admin_token>
```

#### Update Report Status
```http
PUT /reports/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "in_progress"
}
```

---

## 📖 Usage Guide

### For Citizens

1. **Register Account**
   - Navigate to registration page
   - Enter email and password
   - Verify account via email

2. **Submit Report**
   - Click "Report Incident"
   - Select pollution type
   - Provide detailed description
   - Upload incident photos
   - Click on map to select location
   - Submit report

3. **Track Status**
   - Go to "My Reports"
   - View status of each submission
   - Check email for updates

### For Administrators

1. **Login to Admin Panel**
   - Enter admin credentials
   - Access admin dashboard

2. **View Reports**
   - See all submitted incidents
   - Filter by status or severity
   - View incident details

3. **Manage Incidents**
   - Update report status
   - Add internal notes
   - Delete irrelevant reports

4. **Analyze Trends**
   - View dashboard statistics
   - Identify pollution hotspots
   - Export reports for analysis

---

## 🚀 Deployment

### Deploy Backend to Render

1. Create account at [Render](https://render.com/)
2. Connect GitHub repository
3. Create new Web Service
4. Set environment variables in Render dashboard
5. Deploy

### Deploy Frontend to Vercel

1. Create account at [Vercel](https://vercel.com/)
2. Connect GitHub repository
3. Import project
4. Set deployment configuration
5. Deploy

### Environment Variables for Production

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your_production_secret_key
DATABASE_URL=your_production_database_url
# ... other production variables
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Firebase Connection Error
```
Error: Cannot find project credentials
```
**Solution:**
- Verify `.env` file exists and has correct Firebase credentials
- Check Firebase project is active
- Regenerate service account key

#### 2. Cloudinary Upload Failed
```
Error: Invalid Cloudinary credentials
```
**Solution:**
- Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`
- Check Cloudinary account is not suspended
- Verify upload presets in Cloudinary dashboard

#### 3. Email Notifications Not Working
```
Error: SMTP authentication failed
```
**Solution:**
- Enable "Less secure app access" in Gmail (or use App Password)
- Verify email credentials in `.env`
- Check if Gmail is blocking the connection

#### 4. CORS Error in Browser
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure `cors` is enabled in Express server
- Check API endpoint URLs are correct
- Clear browser cache and restart

#### 5. Map Not Loading
```
Map initialization error
```
**Solution:**
- Verify Leaflet.js is loaded correctly
- Check browser console for errors
- Ensure `index.html` references map container properly

#### 6. Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

---

## 🔄 Database Schema

### Users Collection
```json
{
  "uid": "user123",
  "email": "user@example.com",
  "name": "User Name",
  "role": "citizen",
  "createdAt": "2024-01-15T10:30:00Z",
  "profileImage": "url_to_image"
}
```

### Reports Collection
```json
{
  "reportId": "report123",
  "userId": "user123",
  "type": "oil_spill",
  "description": "Oil spill details",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Location name"
  },
  "images": ["url1", "url2"],
  "status": "pending",
  "severity": "high",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:30:00Z"
}
```

---

## 📈 Future Enhancements

### Phase 2 Features
- [ ] Mobile application (React Native/Flutter)
- [ ] Push notifications
- [ ] Heatmap visualization of pollution hotspots
- [ ] Real-time incident tracking with WebSocket
- [ ] AI image classification for automatic severity detection
- [ ] Government API integration for official data
- [ ] Multi-language support (10+ languages)
- [ ] Offline report submission with sync
- [ ] IoT sensor integration
- [ ] Machine learning pollution prediction models
- [ ] Social media integration for viral reporting
- [ ] Gamification (badges, leaderboards)
- [ ] Advanced analytics and reporting tools

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### Contributing Guidelines

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/ocean-guardian.git
   cd ocean-guardian
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit with Clear Messages**
   ```bash
   git commit -m "Add: clear description of changes"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Describe changes clearly
   - Reference related issues
   - Wait for review

### Code Style Guidelines

- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Follow existing patterns in codebase

### Reporting Issues

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

MIT License grants you the freedom to use, modify, and distribute this software.

---

## 👨‍💻 Author

**Shahjada**
- B.Tech Computer Science Engineering
- IILM University, Greater Noida
- GitHub: [@mohdshahjada3-star](https://github.com/mohdshahjada3-star)

---

## 🙏 Acknowledgments

Special thanks to:
- **MARS NGO** - Collaboration partner
- **Firebase** - Database and authentication
- **Cloudinary** - Image storage
- **Leaflet.js** - Interactive maps
- **Chart.js** - Data visualization

---

## 📞 Support & Contact

For questions, suggestions, or support:
- Open an GitHub issue
- Check existing documentation
- Review troubleshooting section

---

<div align="center">

## 🌊 Protect Oceans Today for a Better Tomorrow

Join thousands of citizens protecting marine ecosystems. Every report matters. Every action counts.

**Made with ❤️ for ocean conservation**

[![GitHub](https://img.shields.io/badge/GitHub-mohdshahjada3--star-blue?style=flat-square&logo=github)](https://github.com/mohdshahjada3-star)
[![Stars](https://img.shields.io/github/stars/mohdshahjada3-star/ocean-guardian?style=flat-square)](https://github.com/mohdshahjada3-star/ocean-guardian)

⭐ If this project helps you, please star it on GitHub!

</div>
