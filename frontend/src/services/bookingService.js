import apiClient from "./apiClient";

export const bookingService = {
  // Buat reservasi baru (anti double-booking)
  async createBooking(bookingData) {
    const response = await apiClient.post("/bookings", bookingData);
    return response.data;
  },

  // Ambil riwayat booking user/admin
  async getBookings(params = {}) {
    const response = await apiClient.get("/bookings", { params });
    return response.data;
  },

  // Ambil detail satu booking
  async getBookingById(id) {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  // Batalkan booking
  async cancelBooking(id) {
    const response = await apiClient.patch(`/bookings/${id}/cancel`);
    return response.data;
  },

  // Admin update status booking (CONFIRMED / COMPLETED)
  async updateStatus(id, status) {
    const response = await apiClient.patch(`/bookings/${id}/status`, {
      status,
    });
    return response.data;
  },
};
