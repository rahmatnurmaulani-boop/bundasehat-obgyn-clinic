const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const { errorResponse } = require("../utils/response.util");

const verifyToken = (req, res, next) => {
  let token = null;

  // 1. Ambil dari Authorization Header (untuk request standar Axios)
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  // 2. Ambil dari Query Parameter (khusus untuk EventSource / Real-Time SSE Stream)
  else if (req.query && req.query.token) {
    token = req.query.token;
  }

  // Jika tidak ada token sama sekali
  if (!token) {
    return errorResponse(
      res,
      "Akses ditolak. Token tidak disediakan",
      null,
      401,
    );
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // Menyimpan data { id, email, role } ke object request
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return errorResponse(
        res,
        "Token telah kedaluwarsa. Silakan login kembali",
        null,
        401,
      );
    }
    return errorResponse(res, "Token tidak valid", null, 401);
  }
};

module.exports = verifyToken;
