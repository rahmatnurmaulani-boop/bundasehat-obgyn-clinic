const pool = require("../config/database");

class UserRepository {
  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    return rows[0] || null;
  }

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email, phone, role, created_at FROM users WHERE id = ? LIMIT 1",
      [id],
    );
    return rows[0] || null;
  }

  async create({ name, email, password, phone, role = "customer" }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, phone, role],
    );
    return result.insertId;
  }
}

module.exports = new UserRepository();
