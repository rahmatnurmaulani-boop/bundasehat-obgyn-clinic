const pool = require("../config/database");

class BookingRepository {
  // Hitung jumlah booking yang bertabrakan pada rentang waktu yang sama
  async countConflictingBookings(serviceId, bookingDate, startTime, endTime) {
    const query = `
      SELECT COUNT(*) as conflict_count 
      FROM bookings 
      WHERE service_id = ? 
        AND booking_date = ? 
        AND status NOT IN ('CANCELLED')
        AND (start_time < ? AND end_time > ?)
    `;
    const [rows] = await pool.query(query, [
      serviceId,
      bookingDate,
      endTime,
      startTime,
    ]);
    return rows[0].conflict_count;
  }

  async create(data) {
    const query = `
      INSERT INTO bookings (booking_code, user_id, service_id, booking_date, start_time, end_time, total_price, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      data.booking_code,
      data.user_id,
      data.service_id,
      data.booking_date,
      data.start_time,
      data.end_time,
      data.total_price,
      data.status || "PENDING",
      data.notes || null,
    ]);
    return result.insertId;
  }

  async findById(id) {
    const query = `
      SELECT b.*, u.name as customer_name, u.email as customer_email, u.phone as customer_phone,
             s.name as service_name, s.category as service_category, s.duration_minutes
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN services s ON b.service_id = s.id
      WHERE b.id = ?
      LIMIT 1
    `;
    const [rows] = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async findAll({ userId, status, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    let query = `
      SELECT b.*, u.name as customer_name, u.email as customer_email,
             s.name as service_name, s.category as service_category
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN services s ON b.service_id = s.id
      WHERE 1=1
    `;
    let countQuery = "SELECT COUNT(*) as total FROM bookings WHERE 1=1";
    const params = [];
    const countParams = [];

    // Jika dipanggil oleh Customer, batasi hanya booking miliknya
    if (userId) {
      query += " AND b.user_id = ?";
      countQuery += " AND user_id = ?";
      params.push(userId);
      countParams.push(userId);
    }

    if (status) {
      query += " AND b.status = ?";
      countQuery += " AND status = ?";
      params.push(status);
      countParams.push(status);
    }

    query +=
      " ORDER BY b.booking_date DESC, b.start_time DESC LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.query(query, params);
    const [countResult] = await pool.query(countQuery, countParams);

    return {
      bookings: rows,
      total: countResult[0].total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(countResult[0].total / limit),
    };
  }

  async updateStatus(id, status) {
    const [result] = await pool.query(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, id],
    );
    return result.affectedRows > 0;
  }
}

module.exports = new BookingRepository();
