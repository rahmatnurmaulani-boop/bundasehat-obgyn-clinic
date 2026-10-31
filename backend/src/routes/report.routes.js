const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const verifyToken = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/role.middleware");

// Endpoint Laporan Khusus Admin
router.get("/summary", verifyToken, authorizeRole("admin"), (req, res, next) =>
  reportController.getSummary(req, res, next),
);

module.exports = router;
