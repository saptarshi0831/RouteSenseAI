const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/auth.middleware");

const aiController =
  require("../controllers/ai.controller");

router.post(
  "/chat",
  authMiddleware,
  aiController.chat
);

module.exports = router;