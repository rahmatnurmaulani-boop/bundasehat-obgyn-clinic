const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const apiRoutes = require("./routes");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/error.middleware");
const initBookingListeners = require("./events/booking.listener"); // <-- Import listener

const app = express();

// Inisialisasi Event Listeners
initBookingListeners(); // <-- Aktifkan EventEmitter listeners

// Security & Parsing Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing Prefix /api/v1
app.use("/api/v1", apiRoutes);

// Fallback Middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
