const pool = require("../config/database");

class ServiceRepository {
  async findAll({ search, category, isActive, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM services WHERE 1=1";
    let countQuery = "SELECT COUNT(*) as total FROM services WHERE 1=1";
    const params = [];
    const countParams = [];

    if (search) {
      const searchPattern = `%${search}%`;
      query += " AND (name LIKE ? OR description LIKE ?)";
      countQuery += " AND (name LIKE ? OR description LIKE ?)";
      params.push(searchPattern, searchPattern);
      countParams.push(searchPattern, searchPattern);
    }

    if (category) {
      query += " AND category = ?";
      countQuery += " AND category = ?";
      params.push(category);
      countParams.push(category);
    }

    if (isActive !== undefined) {
      query += " AND is_active = ?";
      countQuery += " AND is_active = ?";
      params.push(isActive === "true" || isActive === true ? 1 : 0);
      countParams.push(isActive === "true" || isActive === true ? 1 : 0);
    }

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.query(query, params);
    const [countResult] = await pool.query(countQuery, countParams);

    return {
      services: rows,
      total: countResult[0].total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(countResult[0].total / limit),
    };
  }

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM services WHERE id = ? LIMIT 1",
      [id],
    );
    return rows[0] || null;
  }

  async create(data) {
    const [result] = await pool.query(
      `INSERT INTO services (name, description, category, price, duration_minutes, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.description || null,
        data.category,
        data.price,
        data.duration_minutes || 60,
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
      `UPDATE services SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await pool.query("DELETE FROM services WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = new ServiceRepository();
