# 🩺 BundaSehat — Obgyn & Maternity Care Clinic System

> **Final Project Full Stack Web Development Bootcamp**  
> Sistem Reservasi Janji Temu Medis, Manajemen Katalog Layanan & Jadwal Dokter, Portal Pasien, serta Dashboard Resepsionis Real-Time dengan Algoritma *Anti Double-Booking*.

---

## 🌟 Tentang Proyek

**BundaSehat** adalah aplikasi web layanan kesehatan spesialis kebidanan dan kandungan (obstetri & ginekologi) modern. Sistem ini dirancang untuk menyelesaikan permasalahan antrean fisik yang melelahkan bagi calon ibu, mencegah benturan jadwal dokter, serta memberikan kemudahan operasional klinik mulai dari reservasi online hingga analitik bisnis.

### Fitur Utama:
1. **Public Healthcare Portal:** Informasi klinik, katalog layanan medis terhubung database (dengan fitur *Search*, *Filter Kategori*, dan *Pagination*), profil dokter spesialis, artikel edukasi kehamilan, FAQ interaktif, dan kontak.
2. **Role-Based Authentication (RBAC):** Otentikasi aman berbasis JWT (*JSON Web Token*) dan enkripsi kata sandi `bcryptjs`, membedakan hak akses **Pasien (`customer`)** dan **Resepsionis/Dokter (`admin`)**.
3. **Mesin Reservasi Multi-Langkah (*Anti Double-Booking Engine*):** 
   * Pemilihan layanan, tanggal, dan slot jam.
   * Perhitungan otomatis estimasi waktu selesai berdasarkan durasi layanan.
   * Algoritma validasi irisan waktu di level database yang otomatis menolak bentrok jadwal dengan status `409 Conflict`.
   * Pembuatan kode booking unik (contoh: `BK-20261012-A1B2`).
4. **Portal Pasien (Patient Dashboard):** Riwayat janji temu dengan badge status (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`), fitur pembatalan janji temu, dan data profil rekam medis.
5. **Dashboard Resepsionis (Admin Dashboard):**
   * **Real-Time Notification:** Menggunakan Node.js `EventEmitter` dan *Server-Sent Events (SSE)* untuk pembaruan antrean otomatis tanpa reload.
   * **Laporan & Analitik Bisnis:** Ringkasan total reservasi, pasien selesai, estimasi omzet, top 5 layanan terlaris, dan hari tersibuk.
   * **Master Layanan & Jadwal:** CRUD katalog medis dan pengaturan jam kerja praktek dokter.
   * **Manajemen Tim Dokter:** Tambah/edit/hapus profil dokter spesialis yang otomatis tampil di halaman utama.

---

## 🛠️ Tech Stack

### Frontend:
- **Framework:** React 18 (Vite Bundler)
- **Styling & UI:** Tailwind CSS v3, DaisyUI v4 (*Theme: Modern Luxury Healthcare*)
- **Icons:** Lucide React
- **Routing:** React Router DOM v6 (Nested Layouts & Protected Routes)
- **HTTP Client:** Axios (Centralized API Client dengan Request Interceptor)

### Backend:
- **Runtime:** Node.js (LTS)
- **Framework:** Express.js (Layered Architecture: Route → Middleware → Controller → Service → Repository)
- **Database:** MySQL 8.x
- **Database Client:** `mysql2/promise` (Connection Pooling)
- **Keamanan:** JSON Web Token (`jsonwebtoken`), Password Hashing (`bcryptjs`), `helmet`, `cors`
- **Real-Time Stream:** Node.js Native `EventEmitter` & Server-Sent Events (SSE)
- **Validasi Data:** `joi`
- **Testing:** Jest & Supertest (12/12 Automated Test Suites PASS)

---

## 🗄️ Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : "places"
    SERVICES ||--o{ SCHEDULES : "has"
    SERVICES ||--o{ BOOKINGS : "booked_in"

    USERS {
        int id PK
        string name
        string email UK
        string password
        string phone
        enum role "admin, customer"
        timestamp created_at
    }

    SERVICES {
        int id PK
        string name
        text description
        string category
        decimal price
        int duration_minutes
        boolean is_active
        timestamp created_at
    }

    SCHEDULES {
        int id PK
        int service_id FK
        enum day_of_week
        time start_time
        time end_time
        int slot_capacity
        boolean is_active
    }

    BOOKINGS {
        int id PK
        string booking_code UK
        int user_id FK
        int service_id FK
        date booking_date
        time start_time
        time end_time
        decimal total_price
        enum status "PENDING, CONFIRMED, COMPLETED, CANCELLED"
        text notes
        timestamp created_at
    }

    DOCTORS {
        int id PK
        string name
        string specialty
        string experience
        string education
        string schedule_info
        text bio
        text image_url
        boolean is_active
    }