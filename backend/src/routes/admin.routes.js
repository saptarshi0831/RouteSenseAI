const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const adminAuth = require("../middleware/adminAuth.middleware");

router.use(adminAuth);

router.get("/dashboard", adminController.getDashboardStats);
router.patch("/sos/:id/acknowledge", adminController.acknowledgeSOS);
router.patch("/sos/:id/resolve", adminController.resolveSOS);

module.exports = router;
