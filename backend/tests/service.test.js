const request = require("supertest");
const app = require("../src/app");

describe("Services & RBAC Test Suite", () => {
  let customerToken = "";

  beforeAll(async () => {
    // Login sebagai customer untuk mendapatkan token
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "customer@gmail.com",
      password: "user123",
    });
    customerToken = res.body.data.token;
  });

  it("GET /api/v1/services - Publik dapat melihat daftar layanan dengan pagination (200)", async () => {
    const res = await request(app).get("/api/v1/services?page=1&limit=5");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("services");
    expect(res.body.data).toHaveProperty("total");
    expect(res.body.data).toHaveProperty("totalPages");
    expect(Array.isArray(res.body.data.services)).toBe(true);
  });

  it("GET /api/v1/services/1 - Publik dapat melihat detail layanan (200)", async () => {
    const res = await request(app).get("/api/v1/services/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id", 1);
    expect(res.body.data).toHaveProperty("schedules");
  });

  it("POST /api/v1/services - Customer DITOLAK saat membuat layanan (403 Forbidden)", async () => {
    const res = await request(app)
      .post("/api/v1/services")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        name: "Layanan Customer Ilegal",
        category: "Test",
        price: 50000,
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });
});
