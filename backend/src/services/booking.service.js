const bookingRepository = require("../repositories/booking.repository");
const serviceRepository = require("../repositories/service.repository");
const scheduleRepository = require("../repositories/schedule.repository");
const {
  calculateEndTime,
  getDayName,
  isDateInPast,
  generateBookingCode,
} = require("../utils/date.util");
const { eventBus, EVENTS } = require("../utils/eventBus.util");

class BookingService {
  async createBooking(userId, data) {
    // 1. Validasi Layanan
    const service = await serviceRepository.findById(data.service_id);
    if (!service || !service.is_active) {
      const error = new Error("Layanan tidak tersedia atau tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    // 2. Validasi Tanggal (tidak boleh lampau)
    if (isDateInPast(data.booking_date)) {
      const error = new Error("Tanggal booking tidak boleh di masa lampau");
      error.statusCode = 400;
      throw error;
    }

    // 3. Hitung Waktu Selesai (end_time)
    const formattedStartTime =
      data.start_time.length === 5 ? `${data.start_time}:00` : data.start_time;
    const endTime = calculateEndTime(
      formattedStartTime,
      service.duration_minutes,
    );

    // 4. Periksa ketersediaan jam kerja dari jadwal (Schedule)
    const bookingDay = getDayName(data.booking_date);
    const schedules = await scheduleRepository.findByServiceId(data.service_id);

    // Cari jadwal hari tersebut, JIKA BELUM ADA JADWAL MANUAL DI DB, GUNAKAN JADWAL DEFAULT KLINIK
    let daySchedule = schedules.find((s) => s.day_of_week === bookingDay);

    if (!daySchedule) {
      const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      // Jika dipesan pada hari kerja (Senin - Jumat), gunakan jam operasional standar klinik
      if (weekdays.includes(bookingDay)) {
        daySchedule = {
          day_of_week: bookingDay,
          start_time: "09:00:00",
          end_time: "17:00:00",
          slot_capacity: 1,
        };
      } else {
        const error = new Error(
          `Layanan tidak beroperasi pada hari ${bookingDay}. Klinik hanya buka Senin - Jumat.`,
        );
        error.statusCode = 400;
        throw error;
      }
    }

    // Cek apakah jam booking dalam rentang operasional (09:00 - 17:00)
    if (
      formattedStartTime < daySchedule.start_time ||
      endTime > daySchedule.end_time
    ) {
      const error = new Error(
        `Jam booking di luar jam operasional (${daySchedule.start_time.slice(0, 5)} - ${daySchedule.end_time.slice(0, 5)} WIB)`,
      );
      error.statusCode = 400;
      throw error;
    }

    // 5. Anti Double-Booking Check (Cek Tabrakan Jadwal)
    const conflictCount = await bookingRepository.countConflictingBookings(
      data.service_id,
      data.booking_date,
      formattedStartTime,
      endTime,
    );

    if (conflictCount >= daySchedule.slot_capacity) {
      const error = new Error(
        "Slot jadwal pada jam tersebut sudah penuh atau bertabrakan dengan pesanan lain",
      );
      error.statusCode = 409;
      throw error;
    }

    // 6. Simpan Booking
    const bookingCode = generateBookingCode();
    const newBookingId = await bookingRepository.create({
      booking_code: bookingCode,
      user_id: userId,
      service_id: data.service_id,
      booking_date: data.booking_date,
      start_time: formattedStartTime,
      end_time: endTime,
      total_price: service.price,
      status: "PENDING",
      notes: data.notes,
    });

    const newBooking = await bookingRepository.findById(newBookingId);

    // Pancarkan event real-time
    eventBus.emit(EVENTS.BOOKING_CREATED, newBooking);

    return newBooking;
  }

  async getBookings(user, filters) {
    const userId = user.role === "admin" ? null : user.id;
    return await bookingRepository.findAll({ userId, ...filters });
  }

  async getBookingDetail(user, bookingId) {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) {
      const error = new Error("Pemesanan tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== "admin" && booking.user_id !== user.id) {
      const error = new Error("Akses ditolak");
      error.statusCode = 403;
      throw error;
    }

    return booking;
  }

  async updateBookingStatus(bookingId, status) {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) {
      const error = new Error("Pemesanan tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    await bookingRepository.updateStatus(bookingId, status);
    const updated = await bookingRepository.findById(bookingId);
    eventBus.emit(EVENTS.BOOKING_STATUS_UPDATED, {
      bookingId,
      status,
      updated,
    });

    return updated;
  }

  async cancelBooking(user, bookingId) {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) {
      const error = new Error("Pemesanan tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== "admin" && booking.user_id !== user.id) {
      const error = new Error("Akses ditolak");
      error.statusCode = 403;
      throw error;
    }

    if (booking.status === "COMPLETED" || booking.status === "CANCELLED") {
      const error = new Error(
        `Pesanan tidak dapat dibatalkan karena berstatus ${booking.status}`,
      );
      error.statusCode = 400;
      throw error;
    }

    await bookingRepository.updateStatus(bookingId, "CANCELLED");
    const cancelled = await bookingRepository.findById(bookingId);
    eventBus.emit(EVENTS.BOOKING_CANCELLED, { bookingId, cancelled });

    return cancelled;
  }
}

module.exports = new BookingService();
