const express = require("express");

const router = express.Router();

const authController = 
    require(
        "../controllers/auth.controller"
    );

const validate = 
    require(
        "../middleware/validate.middleware"
    );

const {
    signupSchema,
    loginSchema
} = require("../validators/auth.validator");

router.post(
    "/signup",
    validate(signupSchema),
    authController.signup
);

router.post(
    "/login",

    validate(loginSchema),
    authController.login
);

module.exports = router;

/*
Client
  ↓
express.json()
  ↓
validate(signupSchema)
  ↓ (only if valid)
Controller (req.body received)
  ↓
Service (business logic: checks, hashing, JWT)
  ↓
Repository (DB queries)
  ↓
Database
  ↓
Response returned
*/