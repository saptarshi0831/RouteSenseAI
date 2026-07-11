const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Routes
const authRoutes = require("./routes/auth.routes");
const shareRoutes = require("./routes/share.routes");
const sosRoutes = require("./routes/sos.routes");
const aiRoutes = require("./routes/ai.routes");
const hospitalRoutes = require("./routes/hospital.routes");
const geocodeRoutes = require("./routes/geocode.routes");

// Middleware
const authMiddleware = require("./middleware/auth.middleware"); // Temporary protected route
const errorHandler = require("./middleware/error.middleware");
/* --------------------------------------------------
   Global Middleware
-------------------------------------------------- */

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Add common security headers
app.use(helmet());

// Log incoming requests
app.use(morgan("dev"));

// Parse JSON request bodies
app.use(express.json());

/* --------------------------------------------------
   Routes
-------------------------------------------------- */

// Authentication APIs
app.use("/api/auth", authRoutes);

// Share Session APIs
app.use("/api/share", shareRoutes);

// SOS routes
app.use("/api/sos", sosRoutes);

// AI routes
app.use("/api/ai", aiRoutes);

// Hospital routes
app.use("/api/hospitals",hospitalRoutes);

// Destination search
app.use("/api/geocode", geocodeRoutes);

// Temporary protected route for testing authentication
app.get(
  "/api/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

// Health check / Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RouteSense AI backend running",
  });
});

/* --------------------------------------------------
   Global Error Handler
   (Must be the last middleware)
-------------------------------------------------- */

app.use(errorHandler);

module.exports = app;

/*
=========================================================
Request Flow
=========================================================

Client Request
      │
      ▼
app.use(cors())
      │
      ▼
app.use(helmet())
      │
      ▼
app.use(morgan("dev"))
      │
      ▼
app.use(express.json())
      │
      ▼
Route Matching
      │
      ├───────────────┐
      │               │
      ▼               ▼
 /api/auth        /api/share
      │               │
      ▼               ▼
Authentication    Authentication (if protected)
Middleware         Middleware (if protected)
      │               │
      ▼               ▼
Validation      Validation (optional)
Middleware
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Database (Prisma)
      │
      ▼
Response Sent to Client
      │
      ▼
If an error occurs at any stage,
it is passed to:

app.use(errorHandler)

which returns a standardized error response.

=========================================================
*/