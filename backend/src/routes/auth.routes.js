const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const verifyToken = require("../middleware/auth.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validation");

// Public routes
router.post("/register", validate(registerSchema), (req, res, next) =>
  authController.register(req, res, next),
);
router.post("/login", validate(loginSchema), (req, res, next) =>
  authController.login(req, res, next),
);

// Protected route
router.get("/me", verifyToken, (req, res, next) =>
  authController.getProfile(req, res, next),
);

module.exports = router;
