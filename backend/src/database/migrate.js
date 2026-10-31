require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function runMigration() {
  const isCloud = process.env.DB_HOST && process.env.DB_HOST !== "localhost";

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT) || 3306,
    multipleStatements: true,
    ssl: isCloud ? { rejectUnauthorized: false } : undefined,
  });

  try {
    const dbName = process.env.DB_NAME || "booking_service_db";
    console.log(`[Migrate] Memeriksa keberadaan database '${dbName}'...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    const sqlFilePath = path.join(
      __dirname,
      "migrations",
      "001_initial_schema.sql",
    );
    const sql = fs.readFileSync(sqlFilePath, "utf8");

    console.log(
      `[Migrate] Menjalankan file migrasi: 001_initial_schema.sql...`,
    );
    await connection.query(sql);

    console.log("✅ [Migrate] Migrasi database berhasil dibuat!");
  } catch (err) {
    console.error("❌ [Migrate] Migrasi database gagal:", err.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

runMigration();
