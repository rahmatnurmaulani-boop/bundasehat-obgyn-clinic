require("dotenv").config();

module.exports = {
  secret:
    process.env.JWT_SECRET || "rahasia_super_aman",
  expiresIn: process.env.JWT_EXPIRES_IN || "24h",
};
