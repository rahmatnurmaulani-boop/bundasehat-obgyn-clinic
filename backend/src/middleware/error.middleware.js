const { errorResponse } = require("../utils/response.util");

// Middleware untuk endpoint yang tidak ditemukan (404)
const notFoundHandler = (req, res, next) => {
  return errorResponse(
    res,
    `Route ${req.originalUrl} tidak ditemukan`,
    null,
    404,
  );
};

// Global Centralized Error Handler
const errorHandler = (err, req, res, next) => {
  console.error("[Error Logger]:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Terjadi kesalahan internal pada server";
  const errors = err.errors || null;

  return errorResponse(res, message, errors, statusCode);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
