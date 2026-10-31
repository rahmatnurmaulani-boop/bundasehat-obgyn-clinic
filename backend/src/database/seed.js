require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("../config/database");

async function runSeeder() {
  const connection = await pool.getConnection();
  try {
    console.log("Memulai seeding data Klinik Kandungan...");

    // 1. Seed Users (1 Admin / Resepsionis Klinik & 1 Pasien)
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt);
    const customerPassword = await bcrypt.hash("user123", salt);

    await connection.query(
      `
      INSERT INTO users (name, email, password, phone, role) VALUES 
      ('Resepsionis BundaSehat', 'admin@booking.com', ?, '081234567890', 'admin'),
      ('Ibu Sarah (Pasien)', 'customer@gmail.com', ?, '089876543210', 'customer')
      ON DUPLICATE KEY UPDATE name=VALUES(name);
    `,
      [adminPassword, customerPassword],
    );

    // 2. Seed Services (Layanan Klinik Kandungan & Kebidanan)
    await connection.query(`
      INSERT INTO services (id, name, description, category, price, duration_minutes, is_active) VALUES 
      (1, 'Konsultasi Kehamilan & USG 2D/3D', 'Pemeriksaan rutin tumbuh kembang janin bersama Dokter Spesialis Obgyn', 'Pemeriksaan Kehamilan', 250000.00, 30, 1),
      (2, 'Pemeriksaan USG 4D HD Live', 'Melihat wajah dan gerakan janin secara nyata dan detail dalam format video 4D', 'Pemeriksaan Kehamilan', 450000.00, 45, 1),
      (3, 'Konsultasi Program Hamil (Promil)', 'Konseling dan pemeriksaan kesuburan bagi pasangan yang merencanakan kehamilan', 'Program Hamil', 350000.00, 60, 1),
      (4, 'Pemeriksaan Pap Smear & Organ Kewanitaan', 'Pemeriksaan deteksi dini kesehatan leher rahim dan organ reproduksi', 'Kesehatan Wanita', 300000.00, 45, 1)
      ON DUPLICATE KEY UPDATE name=VALUES(name), category=VALUES(category), price=VALUES(price), duration_minutes=VALUES(duration_minutes);
    `);

    // 3. Seed Schedules (Praktek Dokter: Senin - Jumat, 09:00 - 17:00)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    for (const serviceId of [1, 2, 3, 4]) {
      for (const day of days) {
        await connection.query(
          `
          INSERT INTO schedules (service_id, day_of_week, start_time, end_time, slot_capacity, is_active) VALUES 
          (?, ?, '09:00:00', '17:00:00', 1, 1)
          ON DUPLICATE KEY UPDATE start_time=VALUES(start_time);
        `,
          [serviceId, day],
        );

        // 3. Pastikan SEMUA layanan yang ada di database memiliki jadwal Senin - Jumat
        const [allServices] = await connection.query("SELECT id FROM services");
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        for (const svc of allServices) {
          for (const day of days) {
            await connection.query(
              `
          INSERT INTO schedules (service_id, day_of_week, start_time, end_time, slot_capacity, is_active) VALUES 
          (?, ?, '09:00:00', '17:00:00', 1, 1)
          ON DUPLICATE KEY UPDATE start_time=VALUES(start_time);
        `,
              [svc.id, day],
            );
          }
        }

        // 4. Seed Doctors (Tim Dokter Spesialis Obgyn)
        await connection.query(`
      INSERT INTO doctors (id, name, specialty, experience, education, schedule_info, bio, image_url, is_active) VALUES 
      (1, 'dr. Farah Anggraini, Sp.OG', 'Spesialis Obstetri & Ginekologi (Konsultan USG Fetomaternal)', '12 Tahun Pengalaman', 'Fakultas Kedokteran Universitas Indonesia', 'Senin - Kamis (09:00 - 15:00)', 'Berpengalaman mendalam dalam deteksi dini kelainan janin melalui USG 4D dan penanganan kehamilan berisiko tinggi.', 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&auto=format&fit=crop&q=80', 1),
      (2, 'dr. Dimas Pratama, Sp.OG', 'Spesialis Kebidanan & Fertilitas Reproduksi', '9 Tahun Pengalaman', 'Fakultas Kedokteran Universitas Gadjah Mada', 'Rabu - Sabtu (10:00 - 17:00)', 'Fokus pada pendampingan pasangan pejuang garis dua melalui konsultasi Program Hamil (Promil) yang terarah.', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80', 1),
      (3, 'dr. Ratna Wulandari, Sp.OG', 'Spesialis Kesehatan Reproduksi Wanita', '15 Tahun Pengalaman', 'Fakultas Kedokteran Universitas Airlangga', 'Senin, Jumat & Sabtu (09:00 - 16:00)', 'Ahli dalam skrining kesehatan serviks, papsmear, pencegahan infeksi reproduksi, serta perawatan nifas pasca salin.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80', 1)
      ON DUPLICATE KEY UPDATE 
        name=VALUES(name), 
        image_url=VALUES(image_url), 
        specialty=VALUES(specialty);
    `);
      }
    }

    console.log(
      "Berhasil mengisi dummy data: Klinik Dokter Kandungan & Kebidanan!",
    );
  } catch (err) {
    console.error("Seeding data gagal:", err.message);
    process.exit(1);
  } finally {
    connection.release();
    process.exit(0);
  }
}

runSeeder();
