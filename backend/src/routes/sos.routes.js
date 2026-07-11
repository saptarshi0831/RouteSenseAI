const express = require("express");

const router = express.Router();

const sosController = require("../controllers/sos.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  createEmergencySchema,
} = require("../validators/sos.validator");

router.post(
  "/",
  authMiddleware,
  validate(createEmergencySchema),
  sosController.createEmergency
);

router.get(
  "/active",
  authMiddleware,
  sosController.getActiveEmergencies
);

module.exports = router;