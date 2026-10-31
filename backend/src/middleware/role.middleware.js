const { errorResponse } = require("../utils/response.util");

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return errorResponse(
        res,
        "Akses ditolak. Anda tidak memiliki izin untuk melakukan tindakan ini",
        null,
        403,
      );
    }
    next();
  };
};

module.exports = authorizeRole;
