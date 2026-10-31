const bookingService = require("../services/booking.service");
const { successResponse } = require("../utils/response.util");

class BookingController {
  // Real-Time Server-Sent Events (SSE) Stream
  liveStream(req, res) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Kirim pesan koneksi berhasil
    res.write(
      `data: ${JSON.stringify({ type: "CONNECTED", message: "Koneksi real-time aktif" })}\n\n`,
    );

    const { eventBus, EVENTS } = require("../utils/eventBus.util");

    const onBookingCreated = (data) => {
      res.write(
        `data: ${JSON.stringify({ event: "BOOKING_CREATED", data })}\n\n`,
      );
    };

    const onStatusUpdated = (data) => {
      res.write(
        `data: ${JSON.stringify({ event: "STATUS_UPDATED", data })}\n\n`,
      );
    };

    eventBus.on(EVENTS.BOOKING_CREATED, onBookingCreated);
    eventBus.on(EVENTS.BOOKING_STATUS_UPDATED, onStatusUpdated);

    req.on("close", () => {
      eventBus.off(EVENTS.BOOKING_CREATED, onBookingCreated);
      eventBus.off(EVENTS.BOOKING_STATUS_UPDATED, onStatusUpdated);
      res.end();
    });
  }

  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await bookingService.createBooking(userId, req.body);
      return successResponse(res, "Booking berhasil dibuat", result, 201);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await bookingService.getBookings(req.user, req.query);
      return successResponse(res, "Daftar booking berhasil diambil", result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await bookingService.getBookingDetail(
        req.user,
        req.params.id,
      );
      return successResponse(res, "Detail booking berhasil diambil", result);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      const result = await bookingService.updateBookingStatus(
        req.params.id,
        status,
      );
      return successResponse(res, "Status booking berhasil diperbarui", result);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const result = await bookingService.cancelBooking(
        req.user,
        req.params.id,
      );
      return successResponse(res, "Booking berhasil dibatalkan", result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();
