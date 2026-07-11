const express = require("express");

const router = express.Router();

const shareController = require("../controllers/share.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createShareSchema,
} = require("../validators/share.validator");

router.post(
  "/create",
  authMiddleware,
  validate(createShareSchema),
  shareController.createShareSession
);

router.post(
  "/join",
  authMiddleware,
  shareController.joinShareSession
);

router.get(
  "/:shareCode",
  authMiddleware,
  shareController.getShareSession
);

router.delete(
  "/:shareCode",
  authMiddleware,
  shareController.endShareSession
);

module.exports = router;