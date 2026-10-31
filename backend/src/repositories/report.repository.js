const pool = require("../config/database");

class ReportRepository {
  // Ringkasan metrik utama (Total Booking, Selesai, Pendapatan)
  async getMetricsSummary() {
    const query = `
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as total_completed,
        SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as total_pending,
        SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as total_cancelled,
        COALESCE(SUM(CASE WHEN status IN ('CONFIRMED', 'COMPLETED') THEN total_price ELSE 0 END), 0) as total_revenue
      FROM bookings
    `;
    const [rows] = await pool.query(query);
    return rows[0];
  }

  // Laporan Layanan Terlaris (Top Services)
  async getPopularServices(limit = 5) {
    const query = `
      SELECT 
        s.id as service_id,
        s.name as service_name,
        s.category,
        s.price,
        COUNT(b.id) as total_bookings,
        COALESCE(SUM(CASE WHEN b.status IN ('CONFIRMED', 'COMPLETED') THEN b.total_price ELSE 0 END), 0) as total_earned
      FROM services s
      LEFT JOIN bookings b ON s.id = b.service_id AND b.status NOT IN ('CANCELLED')
      GROUP BY s.id, s.name, s.category, s.price
      ORDER BY total_bookings DESC
      LIMIT ?
    `;
    const [rows] = await pool.query(query, [Number(limit)]);
    return rows;
  }

  // Laporan Hari Paling Ramai
  async getBusiestDays() {
    const query = `
      SELECT 
        DAYNAME(booking_date) as day_name,
        COUNT(*) as total_bookings
      FROM bookings
      WHERE status NOT IN ('CANCELLED')
      GROUP BY DAYNAME(booking_date)
      ORDER BY total_bookings DESC
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  // Laporan Jam Operasional Paling Ramai
  async getPeakHours() {
    const query = `
      SELECT 
        DATE_FORMAT(start_time, '%H:00') as time_slot,
        COUNT(*) as total_bookings
      FROM bookings
      WHERE status NOT IN ('CANCELLED')
      GROUP BY DATE_FORMAT(start_time, '%H:00')
      ORDER BY total_bookings DESC
      LIMIT 5
    `;
    const [rows] = await pool.query(query);
    return rows;
  }
}

module.exports = new ReportRepository();
