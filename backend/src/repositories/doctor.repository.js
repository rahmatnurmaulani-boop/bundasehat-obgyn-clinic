const pool = require("../config/database");

class DoctorRepository {
  async findAll() {
    const [rows] = await pool.query(
      "SELECT * FROM doctors WHERE is_active = 1 ORDER BY created_at DESC",
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM doctors WHERE id = ? LIMIT 1",
      [id],
    );
    return rows[0] || null;
  }

  async create(data) {
    const [result] = await pool.query(
      `INSERT INTO doctors (name, specialty, experience, education, schedule_info, bio, image_url, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.specialty,
        data.experience || "Berpengalaman",
        data.education || null,
        data.schedule_info,
        data.bio || null,
        data.image_url ||
          "https://images.unsplash.com/photo-1594824813576-2d1252d43171?w=500&auto=format&fit=crop&q=80",
        data.is_active ?? 1,
      ],
    );
    return result.insertId;
  }

  async update(id, data) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(
      `UPDATE doctors SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await pool.query("DELETE FROM doctors WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new DoctorRepository();
