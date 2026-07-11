const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const hospitalController = require(
  "../controllers/hospital.controller"
);

router.get(
  "/nearby",
  authMiddleware,
  hospitalController.getNearbyHospitals
);

module.exports = router;