const pool = require("../config/database");

class ScheduleRepository {
  async findByServiceId(serviceId) {
    const [rows] = await pool.query(
      'SELECT * FROM schedules WHERE service_id = ? AND is_active = 1 ORDER BY FIELD(day_of_week, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"), start_time ASC',
      [serviceId],
    );
    return rows;
  }

  async create(data) {
    const [result] = await pool.query(
      `INSERT INTO schedules (service_id, day_of_week, start_time, end_time, slot_capacity, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.service_id,
        data.day_of_week,
        data.start_time,
        data.end_time,
        data.slot_capacity || 1,
        data.is_active ?? 1,
      ],
    );
    return result.insertId;
  }

  async delete(id) {
    const [result] = await pool.query("DELETE FROM schedules WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = new ScheduleRepository();
