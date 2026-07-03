# OceanGuard

### Marine Pollution Incident Management & Reporting System

[

![GitHub](https://img.shields.io/badge/GitHub-OceanGuard-blue?logo=github)

](https://github.com/mohdshahjada3-star/ocean-guardian)
[

![Status](https://img.shields.io/badge/Status-Active-brightgreen)

]()
[

![SDG 14](https://img.shields.io/badge/SDG-14%20Life%20Below%20Water-0066cc)

]()

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
- **Runtime**: Node.js v14+
- **Framework**: Express.js
- **Database**: Firebase Firestore (Real-time NoSQL)
- **Storage**: Firebase Cloud Storage (Image uploads)
- **Authentication**: Firebase Auth + JWT tokens
- **Email Service**: Nodemailer with SMTP
- **Server Port**: 5000 (configurable)

### Frontend Architecture
- **UI Framework**: HTML5 / CSS3 / Vanilla JavaScript
- **3D Graphics**: Three.js (interactive 3D ocean scene)
- **Mapping**: Leaflet.js (geolocation & incident mapping)
- **Analytics**: Chart.js (data visualization & dashboards)
- **Database Sync**: Firebase Client SDK (real-time updates)

---

## 📁 Project Structure
