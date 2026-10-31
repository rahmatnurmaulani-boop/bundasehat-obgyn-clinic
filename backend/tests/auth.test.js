const request = require("supertest");
const app = require("../src/app");

describe("Authentication Test Suite", () => {
  const randomEmail = `testuser_${Date.now()}@gmail.com`;

  it("POST /api/v1/auth/register - Sukses mendaftarkan user baru (201)", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "User Automated Test",
      email: randomEmail,
      password: "password123",
      phone: "081299998888",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.email).toBe(randomEmail);
  });

  it("POST /api/v1/auth/register - Gagal jika email sudah terdaftar (409 Conflict)", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "User Duplikat",
      email: randomEmail,
      password: "password123",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/v1/auth/login - Sukses login & mendapatkan token JWT (200)", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "admin@booking.com",
      password: "admin123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("token");
  });

  it("POST /api/v1/auth/login - Gagal jika password salah (401 Unauthorized)", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "admin@booking.com",
      password: "passwordsalah",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("GET /api/v1/auth/me - Gagal jika tidak menyertakan token (401 Unauthorized)", async () => {
    const res = await request(app).get("/api/v1/auth/me");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
