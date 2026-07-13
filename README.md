<p align="center">
<img src="images/banner.png" width="100%">
</p>
# 🚑 RouteSense AI

<p align="center">

![MERN](https://img.shields.io/badge/Stack-MERN-success?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-010101?style=for-the-badge&logo=socket.io)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google)

</p>

<p align="center">

### Intelligent Emergency Navigation & Disaster Response Platform

Real-time GPS • AI Emergency Assistant • Disaster Detection • Nearby Hospitals • SOS Alerts • Live Location Sharing • Admin Dashboard

</p>

---

# 🎥 Project Demonstration

> 📺 **Complete Project Demo (YouTube)**

**Watch Here:**  
👉 **https://youtube.com/VIDEO_LINK**

---

# 📖 Table of Contents

- Project Overview
- Problem Statement
- Objectives
- Features
- Technology Stack
- System Architecture
- Project Structure
- Installation Guide
- Environment Variables
- Running the Project
- Screenshots
- AI Assistant
- Route Safety
- SOS Workflow
- Admin Dashboard
- API Overview
- Future Scope
- Contributing
- License

---

# 📌 Project Overview

RouteSense AI is a **MERN Stack based Intelligent Emergency Navigation System** designed to improve public safety during emergencies.

The application combines:

- 📍 Live GPS Tracking
- 🗺 Safe Route Detection
- 🏥 Nearby Hospital Finder
- 🚨 Emergency SOS
- 🤖 AI Emergency Assistant (Google Gemini)
- 📡 Live Location Sharing
- 🔔 Real-time Notifications
- 👨‍💼 Emergency Admin Dashboard

Unlike traditional navigation systems that focus only on the shortest path, RouteSense AI evaluates whether a selected route intersects disaster-prone areas such as floods or fires and immediately warns the user.

The system also enables emergency communication through live SOS alerts and allows administrators to monitor emergencies in real time.

---

# ❗ Problem Statement

During natural disasters and emergencies, people often rely on standard navigation systems that are unaware of hazardous areas such as:

- Flooded roads
- Fire zones
- Road blockages
- Disaster affected regions

This can lead users into dangerous locations.

Additionally,

- Emergency communication is slow.
- People may not know the nearest hospital.
- Family members cannot easily track users.
- Authorities receive delayed emergency information.

RouteSense AI addresses these problems using real-time location tracking, AI assistance, disaster awareness, and emergency communication.

---

# 🎯 Objectives

The main objectives of RouteSense AI are:

- Provide real-time GPS tracking.
- Detect unsafe routes.
- Display nearby hospitals.
- Allow emergency SOS requests.
- Enable live location sharing.
- Provide AI-powered emergency guidance.
- Notify administrators instantly during emergencies.
- Improve emergency response time.

---

# ✨ Features

## 👤 User Features

### 🔐 Authentication

- Secure Login
- User Registration
- JWT Authentication
- Protected Routes

---

### 📍 Live GPS Tracking

- Real-time location updates
- Automatic GPS detection
- Interactive map
- Current position marker

---

### 🏥 Nearby Hospitals

- Nearby hospital detection
- Distance calculation
- Hospital information
- Navigate directly from dashboard

---

### 🗺 Route Navigation

Users can

- Select a destination
- View route
- Check travel distance
- Check estimated travel time

---

### ⚠ Route Safety Detection

RouteSense AI checks whether the selected route passes through disaster zones.

Possible route states:

🟢 Safe Route

or

🔴 Affected Route

If an affected route is detected,

the user receives an immediate warning recommending another destination or alternative route.

---

### 🚨 Emergency SOS

Users can send an emergency SOS with one click.

Features:

- Countdown before sending
- GPS coordinates included
- Real-time notification
- Admin receives SOS immediately

---

### 📡 Live Location Sharing

Users can generate a secure sharing link allowing trusted contacts to monitor their live location.

Features:

- Unique share code
- Secure sharing
- Live location updates
- Clipboard copy

# 🛠 Technology Stack

## Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Leaflet
- React Leaflet
- Leaflet Routing Machine
- Lucide Icons
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO
- Google Gemini AI SDK

---

## APIs & Services

- OpenStreetMap
- Nominatim Search API
- OSRM Routing
- Google Gemini AI API

---

## Database

MongoDB

Collections include:

- Users
- SOS Requests
- Share Sessions

# 🏗️ System Architecture

The application follows a **client-server architecture** using the MERN Stack.

```text
                    ┌───────────────────────────┐
                    │        React Frontend     │
                    │                           │
                    │ Dashboard                 │
                    │ AI Assistant              │
                    │ Live Map                  │
                    │ Hospital Panel            │
                    │ Admin Dashboard           │
                    └────────────┬──────────────┘
                                 │
                    REST APIs + Socket.IO
                                 │
              ┌──────────────────┴─────────────────┐
              │                                    │
       Express.js Backend                 Socket.IO Server
              │                                    │
              │                                    │
              ▼                                    ▼
      Controllers                         Real-time Events
              │
              ▼
         Service Layer
              │
              ▼
          MongoDB Database
              │
              ▼
      Gemini AI / OSRM / Nominatim APIs
```

---

# 📂 Project Structure

```
RouteSense-AI
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   │   ├── admin
│   │   │   ├── dashboard
│   │   │   ├── layout
│   │   │   ├── map
│   │   │   ├── sos
│   │   │   └── ui
│   │   ├── data
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   └── utils
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── sockets
│   ├── utils
│   ├── app.js
│   └── server.js
│
├── README.md
└── .env.example
```

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/USERNAME/RouteSense-AI.git
```

```bash
cd RouteSense-AI
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
```

```bash
npm install
```

---

## 3. Install Backend Dependencies

Open another terminal.

```bash
cd backend
```

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=MONGODB_CONNECTION_STRING

JWT_SECRET=SECRET_KEY

GEMINI_API_KEY=GEMINI_API_KEY

CLIENT_URL=http://localhost:5173
```

---

# 🌐 Required APIs

## Google Gemini AI

Used for:

- Emergency Guidance
- First Aid Assistance
- AI Chat Assistant

Get API Key:

https://aistudio.google.com/app/apikey

---

## MongoDB Atlas

Create a free MongoDB cluster.

Get connection string from

https://www.mongodb.com/atlas

Example

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/routesense
```

---

## OpenStreetMap

Used for:

- Interactive Maps

No API key required.

---

## Nominatim API

Used for:

- Destination Search

No API key required.

---

## OSRM Routing API

Used for:

- Route Generation
- Distance Calculation
- ETA

No API key required.

---

# ▶ Running the Application

## Backend

```bash
cd backend
```

```bash
npm start
```

or

```bash
npm run dev
```

Expected output

```
MongoDB Connected
Server running on port 5000
Socket.IO Initialized
```

---

## Frontend

```bash
cd frontend
```

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# 👤 Test Accounts

## User

```
Email:
test@gmail.com

Password:
Password@123
```

---

## Admin

```
Email:
admin@gmail.com

Password:
Password@123
```

---

# 🔐 Authentication

The project uses **JWT Authentication**.

After successful login,

the backend generates a JWT token.

The frontend stores the token securely and includes it in every authenticated API request.

Protected routes include:

- Dashboard
- Nearby Hospitals
- SOS
- Share Location
- AI Assistant
- Admin Dashboard

---

# 🌍 Real-Time Communication

RouteSense AI uses **Socket.IO** for instant communication.

Events include:

| Event | Description |
|-------|-------------|
| location:update | User GPS updates |
| notification:new | Send notification |
| sos:new | New emergency |
| share:update | Live location sharing |

---

# 🗄️ Database Collections

MongoDB stores the following collections.

## Users

Stores:

- Name
- Email
- Password
- Role

---

## SOS

Stores:

- User
- Latitude
- Longitude
- Message
- Status
- Timestamp

---

## Share Sessions

Stores:

- Creator
- Share Code
- Active Status
- Expiry Time

---

# 📦 Major NPM Packages

## Frontend

```
react
react-router-dom
axios
tailwindcss
leaflet
react-leaflet
leaflet-routing-machine
socket.io-client
lucide-react
```

---

## Backend

```
express
mongoose
jsonwebtoken
bcryptjs
socket.io
cors
dotenv
@google/generative-ai
```

---

# 🚀 Deployment

Frontend

- Vercel
- Netlify

Backend

- Render
- Railway

Database

- MongoDB Atlas

---

# ❗ Troubleshooting

### MongoDB Connection Error

Check

- MongoDB Atlas IP Whitelist
- MONGO_URI

---

### Gemini Error

Verify

```
GEMINI_API_KEY
```

is valid.

---

### JWT Error

Verify

```
JWT_SECRET
```

matches the backend configuration.

---

### Socket Not Connecting

Ensure

- Backend is running
- CLIENT_URL is correct
- Browser allows WebSocket connections

---

### Route Not Showing

Verify

- GPS is enabled
- Destination is selected
- Internet connection is active

---

# 🧪 Recommended Browser

- Google Chrome ✅
- Microsoft Edge ✅
- Firefox ✅

# 📸 Application Preview

---

## 🔐 Login Page

The login page provides secure authentication for registered users using JWT authentication.

**Features**

- User authentication
- Form validation
- Password protection
- Redirect to Dashboard after login

📷 Screenshot

<p align="center">
<img src="images/login-page.png" width="100%">
</p>

---

## 📝 Registration Page

Allows new users to create an account securely.

Features include:

- Name
- Email
- Password
- Password confirmation
- Input validation

📷 Screenshot

<p align="center">
<img src="images/register-page.png" width="100%">
</p>`

---

## 🏠 User Dashboard

The dashboard acts as the central hub of the application.

It provides:

- Live GPS
- Route Navigation
- Nearby Hospitals
- AI Assistant
- SOS
- Notifications

📷 Screenshot

<p align="center">
<img src="images/dashboard.png" width="100%">
</p>

---

## 🗺 Live Map

The interactive map is powered by **Leaflet** and **OpenStreetMap**.

It displays:

- Current user location
- Nearby hospitals
- Disaster zones
- Navigation route
- Live updates

📷 Screenshot

<p align="center">
<img src="images/live-map.png" width="100%">
</p>

---

## 🏥 Nearby Hospitals

Displays nearby hospitals based on the user's current GPS location.

Information includes:

- Hospital Name
- Address
- Distance
- Navigate button

📷 Screenshot

<p align="center">
<img src="images/hospital-panel.png" width="100%">
</p>

---

## ⚠ Route Safety Detection

When the user selects a destination, RouteSense AI evaluates whether the generated route intersects disaster-affected areas.

### Safe Route

Displays:

- Distance
- Estimated Travel Time
- Safe Recommendation

📷 Screenshot

<p align="center">
<img src="images/safe-route.png" width="100%">
</p>

---

### Affected Route

If a route intersects a disaster zone:

- Warning displayed
- Disaster name shown
- Recommendation to choose another destination

📷 Screenshot

<p align="center">
<img src="images/affected-route.png" width="100%">
</p>

---

### Alternate Route

If a route intersects a disaster zone:

- Warning displayed
- Disaster name shown
- Recommendation to choose alternative route

📷 Screenshot

<p align="center">
<img src="images/alternate-route.png" width="100%">
</p>

---

## 🤖 AI Emergency Assistant

Powered by Google Gemini AI.

Supports:

- First Aid
- Road Accident Guidance
- SOS Instructions
- Hospital Guidance
- RouteSense Features

The assistant also receives application context such as:

- Route Status
- Destination
- Nearby Hospitals
- Active Warnings

making responses more relevant to the user's current situation.

📷 Screenshot

<p align="center">
<img src="images/ai-chat.png" width="100%">
</p>

---

## 🚨 SOS

Users can send an SOS request with a countdown confirmation.

Workflow:

```
User Presses SOS
        │
        ▼
Countdown Starts
        │
        ▼
SOS Created
        │
        ▼
Socket.IO Event
        │
        ▼
Admin Dashboard Receives SOS
        │
        ▼
Admin Acknowledges SOS
        │
        ▼
User Receives Notification
```

📷 Screenshot

<p align="center">
<img src="images/sos-modal.png" width="100%">
</p>

<p align="center">
<img src="images/sos-success.png" width="100%">
</p>

---

## 📡 Live Location Sharing

Users can create a secure live-sharing session.

Features:

- Share link generation
- Share code
- Clipboard copy
- Live location updates

📷 Screenshot

<p align="center">
<img src="images/location-share.png" width="100%">
</p>

---

## 🔔 Notifications

Real-time notifications are delivered using Socket.IO.

Notification Types:

- AI Response
- Nearby Hospitals
- SOS Status
- Live Sharing
- Admin Response

📷 Screenshot

<p align="center">
<img src="images/notifications.png" width="100%">
</p>

---

## 👨‍💼 Admin Dashboard

The Admin Dashboard is responsible for monitoring emergency requests.

Features:

- Live SOS Feed
- Emergency Statistics
- Pending SOS
- Acknowledge SOS
- Resolve SOS
- Real-Time Notifications

📷 Screenshot

<p align="center">
<img src="images/admin-dashboard.png" width="100%">
</p>

---

# 🔄 Application Workflow

## User Workflow

```
Register/Login
        │
        ▼
Dashboard
        │
        ▼
GPS Tracking
        │
        ▼
Search Destination
        │
        ▼
Generate Route
        │
        ▼
Route Safety Analysis
        │
        ▼
Nearby Hospitals
        │
        ▼
Need Help?
        │
        ▼
AI Assistant
        │
        ▼
Emergency?
        │
        ▼
SOS
```

---

## Admin Workflow

```
Admin Login
        │
        ▼
Admin Dashboard
        │
        ▼
Receive SOS
        │
        ▼
View Emergency
        │
        ▼
Acknowledge SOS
        │
        ▼
User Notification
        │
        ▼
Resolve Emergency
```

---

# 🤖 AI Assistant Workflow

```
User Question
        │
        ▼
Frontend
        │
        ▼
Express API
        │
        ▼
Context Added

(Route Status)

(Destination)

(Hospitals)

(Warnings)
        │
        ▼
Google Gemini AI
        │
        ▼
AI Response
        │
        ▼
Notification Generated
        │
        ▼
Displayed to User
```

---

# 🚨 SOS Workflow

```
User Presses SOS
        │
        ▼
SOS API
        │
        ▼
MongoDB
        │
        ▼
Socket.IO
        │
        ├──────────────► Admin Dashboard

        ▼
Notification
        ▼
User Confirmation
```

---

# 📡 Live Sharing Workflow

```
Create Share Session
        │
        ▼
Generate Share Code
        │
        ▼
Generate Share URL
        │
        ▼
Copy Link
        │
        ▼
Trusted Contact Opens Link
        │
        ▼
Live Location Updates
```

---

# 🔔 Notification Workflow

```
Action

↓

Backend Controller

↓

Notification Service

↓

Socket.IO

↓

Frontend Notification Card

↓

User/Admin
```

---

# 🌐 REST API Overview

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | User Login |

---

## Hospitals

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/hospitals/nearby | Nearby Hospitals |

---

## SOS

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/sos | Create Emergency |
| GET | /api/sos | Active Emergencies |

---

## Share

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/share | Create Session |
| GET | /api/share/:code | Get Session |
| PATCH | /api/share/:code/end | End Session |

---

## AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ai/chat | AI Emergency Assistant |

---

## Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/dashboard | Dashboard Statistics |
| PATCH | /api/admin/sos/:id/acknowledge | Acknowledge SOS |
| PATCH | /api/admin/sos/:id/resolve | Resolve SOS |

---

# 🧪 Testing

The project has been manually tested for:

- ✅ Authentication
- ✅ Protected Routes
- ✅ Live GPS
- ✅ Nearby Hospitals
- ✅ Route Navigation
- ✅ Route Safety Detection
- ✅ AI Assistant
- ✅ SOS
- ✅ Live Location Sharing
- ✅ Admin Dashboard
- ✅ Socket.IO Notifications
- ✅ Responsive Layout
- ✅ API Integration

# 🔒 Security Features

RouteSense AI follows security best practices to protect user data and application integrity.

### Authentication & Authorization

- JWT-based Authentication
- Protected API Routes
- Role-Based Access Control (User & Admin)
- Secure Password Hashing using bcrypt
- Middleware-based Route Protection

---

### Data Security

- Environment variables for sensitive credentials
- MongoDB Atlas secure connection
- API keys stored securely in `.env`
- Server-side validation for requests

---

### Real-Time Security

- Authenticated Socket.IO connections
- User-specific notification channels
- Admin-only emergency events
- Protected SOS management

---

# ⚡ Performance Highlights

The application is designed to provide a smooth and responsive experience.

### Optimizations

- Lazy loading of dashboard data
- React Hooks for efficient state management
- Socket.IO for instant communication
- Optimized API requests
- Lightweight UI components
- Responsive design using Tailwind CSS

---

# 🌟 Key Innovations

Unlike a traditional navigation application, RouteSense AI combines multiple technologies into a single emergency response platform.

### Intelligent Route Analysis

- Detects disaster-affected routes.
- Warns users before entering dangerous areas.
- Displays Safe or Affected Route status.

---

### Alternate Route Suggestion

If the selected route is unsafe, RouteSense AI suggests an alternate path to help users avoid affected areas whenever possible.

> **Note:** The current implementation provides a basic alternate route strategy. More advanced dynamic rerouting using dedicated routing engines (such as GraphHopper or Google Maps Directions API) can be integrated in future versions.

---

### AI Emergency Assistant

The integrated Gemini AI assistant provides:

- First Aid Guidance
- Emergency Advice
- RouteSense feature assistance
- Context-aware responses based on the application's current state

---

### Real-Time Emergency Communication

Socket.IO enables:

- Instant SOS delivery
- Live notifications
- Live location updates
- Admin monitoring

---

# 🚀 Future Enhancements

The following features are planned for future releases.

## 🌊 Community Disaster Reporting

Users will be able to report:

- Floods
- Fires
- Road Blockages
- Landslides

Each report may include:

- GPS Location
- Description
- Photo Upload

When multiple verified reports are received from the same area, the system can automatically create a disaster zone.

---

## 🗳 Community Verification

Allow nearby users to confirm reported incidents.

Examples:

- Flood Confirmed
- Fire Confirmed
- Road Cleared

This improves the reliability of disaster information.

---

## 🤖 AI Incident Summaries

Administrators can generate AI-powered summaries of emergency events.

Example:

- Total SOS Today
- High-risk Areas
- Most Frequent Disaster Type
- Suggested Resource Allocation

---

## 📊 Analytics Dashboard

Advanced statistics such as:

- Daily SOS Count
- Monthly Emergency Trends
- Most Dangerous Areas
- Response Time Analysis

---

## 📱 Mobile Application

Native Android and iOS applications using React Native.

---

## 🌍 Multi-Language Support

Support for multiple languages to improve accessibility.

---

## 🔔 Push Notifications

Integration with Firebase Cloud Messaging (FCM) for instant mobile alerts.

---

## ☁ Cloud Deployment

Deploy the application using:

- Vercel
- Render
- Railway
- MongoDB Atlas

---

# ⚠ Known Limitations

Current version limitations include:

- Disaster locations are currently based on predefined datasets.
- Alternate route generation uses a basic implementation.
- Internet connection is required.
- AI responses are intended for guidance and should not replace professional medical or emergency services.
- Community disaster reporting is planned for future versions.

---

# 📈 Learning Outcomes

This project provided practical experience in:

- MERN Stack Development
- REST API Design
- JWT Authentication
- MongoDB Data Modeling
- React Hooks
- Socket.IO Real-Time Communication
- Google Gemini AI Integration
- Interactive Maps using Leaflet
- Route Analysis
- Emergency System Design
- Git & GitHub Collaboration

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve RouteSense AI:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 👨‍💻 Author

**Saptarshi Das**

Master of Computer Applications (AI & IoT)

📧 Email: saptarshi0831@gmail.com

🔗 GitHub: https://github.com/saptarshi0831

🔗 LinkedIn: https://www.linkedin.com/in/saptarshi-das-418794323/

---

# 🙏 Acknowledgements

Special thanks to the following technologies and communities:

- React.js
- Node.js
- Express.js
- MongoDB Atlas
- Socket.IO
- Leaflet
- OpenStreetMap
- OSRM Routing Service
- Google Gemini AI
- Lucide React Icons
- Tailwind CSS

---
### Contributors

- Saptarshi Das
- Rishabh Sharma
- Rishabh Bharadwaj


---

# ⭐ Support the Project

If you found this project useful,

please consider giving it a ⭐ on GitHub.

It helps support future development and encourages continued improvements.

---

# 🎓 Project Conclusion

RouteSense AI demonstrates how modern web technologies, artificial intelligence, and real-time communication can be combined to improve emergency response and navigation safety.

By integrating:

- 📍 Live GPS Tracking
- 🗺 Intelligent Route Safety Analysis
- 🏥 Nearby Hospital Discovery
- 🚨 Emergency SOS
- 🤖 Context-Aware AI Assistant
- 📡 Live Location Sharing
- 🔔 Real-Time Notifications
- 👨‍💼 Admin Emergency Dashboard

the platform provides a unified solution for emergency preparedness and disaster-aware navigation.

This project highlights the practical application of the MERN Stack, Socket.IO, and Google Gemini AI in building a scalable, responsive, and user-centric emergency assistance platform.

---

<p align="center">

### ⭐ Thank you for visiting RouteSense AI!

Made with ❤️ using the MERN Stack, Socket.IO, Leaflet, and Google Gemini AI.

</p>