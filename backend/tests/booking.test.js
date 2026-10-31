const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/database");

describe("Booking & Anti Double-Booking Test Suite", () => {
  let customerToken = "";

  beforeAll(async () => {
    // Dapatkan token customer untuk pengujian
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "customer@gmail.com",
      password: "user123",
    });
    customerToken = res.body.data.token;
  });

  afterAll(async () => {
    // Menutup koneksi database pool agar Jest keluar tanpa open handles
    await pool.end();
  });

  it("GET /api/v1/bookings - Customer dapat melihat riwayat booking miliknya (200)", async () => {
    const res = await request(app)
      .get("/api/v1/bookings")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("bookings");
    expect(Array.isArray(res.body.data.bookings)).toBe(true);
  });

  it("POST /api/v1/bookings - Ditolak jika tanggal di masa lampau (400 Bad Request)", async () => {
    const res = await request(app)
      .post("/api/v1/bookings")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        service_id: 1,
        booking_date: "2020-01-01", // tanggal lampau
        start_time: "10:00:00",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
