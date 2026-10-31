const authService = require("../services/auth.service");
const { successResponse } = require("../utils/response.util");

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      return successResponse(res, "Registrasi berhasil", result, 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      return successResponse(res, "Login berhasil", result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await authService.getProfile(userId);
      return successResponse(res, "Profil berhasil diambil", result, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
