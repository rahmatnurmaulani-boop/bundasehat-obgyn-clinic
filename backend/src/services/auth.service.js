const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const userRepository = require("../repositories/user.repository");

class AuthService {
  async register({ name, email, password, phone }) {
    // 1. Cek apakah email sudah terdaftar
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error("Email sudah digunakan");
      error.statusCode = 409;
      throw error;
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan user baru (role default selalu 'customer')
    const userId = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: "customer",
    });

    return {
      id: userId,
      name,
      email,
      role: "customer",
    };
  }

  async login(email, password) {
    // 1. Cari user berdasarkan email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error = new Error("Email atau password salah");
      error.statusCode = 401;
      throw error;
    }

    // 2. Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Email atau password salah");
      error.statusCode = 401;
      throw error;
    }

    // 3. Generate Token JWT
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const error = new Error("User tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}

module.exports = new AuthService();
