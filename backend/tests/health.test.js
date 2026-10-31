const request = require("supertest");
const app = require("../src/app");

describe("Health Check Test Suite", () => {
  it("GET /api/v1/health - Berhasil merespons server aktif (200 OK)", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("uptime");
    expect(res.body.data).toHaveProperty("timestamp");
  });

  it("GET route sembarang - Merespons fallback 404 Not Found", async () => {
    const res = await request(app).get("/api/v1/unknown-endpoint");

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
