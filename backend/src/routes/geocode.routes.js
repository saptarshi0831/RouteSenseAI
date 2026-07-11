const express = require("express");

const router = express.Router();

const geocodeController = require("../controllers/geocode.controller");

router.get(
  "/search",
  geocodeController.searchLocation
);

module.exports = router;