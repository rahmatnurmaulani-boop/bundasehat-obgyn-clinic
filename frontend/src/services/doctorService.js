import apiClient from "./apiClient";

export const doctorService = {
  // Public: Ambil seluruh dokter
  async getDoctors() {
    const response = await apiClient.get("/doctors");
    return response.data; // { success, message, data: [...] }
  },

  // Admin: Tambah dokter baru
  async createDoctor(data) {
    const response = await apiClient.post("/doctors", data);
    return response.data;
  },

  // Admin: Update dokter
  async updateDoctor(id, data) {
    const response = await apiClient.put(`/doctors/${id}`, data);
    return response.data;
  },

  // Admin: Hapus dokter
  async deleteDoctor(id) {
    const response = await apiClient.delete(`/doctors/${id}`);
    return response.data;
  },
};
