# RouteSense AI

RouteSense AI is a MERN Stack based emergency navigation system that helps users detect hazardous routes, locate nearby hospitals, share live location, and send SOS alerts during emergencies.

---

## Features

- Live GPS Tracking
- Interactive Leaflet Map
- Nearby Hospitals
- Disaster Zone Detection
- Safe / Affected Route Detection
- Route ETA & Distance
- Emergency SOS
- Live Location Sharing
- AI Chat Assistant
- Notifications Dashboard

---

## Tech Stack

### Frontend
- React
- Vite
- React Leaflet
- Tailwind CSS
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT Authentication

---

# Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/RouteSense-AI.git

cd RouteSense-AI
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_MAPS_API_KEY=your_google_maps_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Start backend

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Create a `.env` file inside the `frontend` folder.

Example:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend

```bash
npm run dev
```

---

## Running the Application

Backend

```bash
cd backend

npm run dev
```

Frontend

```bash
cd frontend

npm run dev
```

Open

```
http://localhost:5173
```

---

## Folder Structure

```
RouteSense-AI
│
├── frontend
├── backend
└── README.md
```

---

## Future Enhancements

- Google Maps Routes API Integration
- Real-time Disaster API
- Weather Integration
- AI Route Recommendation
- Mobile Application

---

## Authors

Developed as a Final Year MERN Stack Project.