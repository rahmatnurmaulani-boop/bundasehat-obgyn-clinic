const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const serviceRoutes = require("./service.routes");
const scheduleRoutes = require("./schedule.routes");
const bookingRoutes = require("./booking.routes");
const reportRoutes = require("./report.routes");
const doctorRoutes = require("./doctor.routes"); 
const { successResponse } = require("../utils/response.util");

// Endpoint Health Check
router.get("/health", (req, res) => {
  return successResponse(res, "Server backend berjalan dengan normal", {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Registrasi Semua Module API
router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reports", reportRoutes);
router.use("/doctors", doctorRoutes); // <-- pasang rute doctors

module.exports = router;
