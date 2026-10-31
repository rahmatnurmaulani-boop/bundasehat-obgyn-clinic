import apiClient from "./apiClient";

export const medicalService = {
  async getServices(params = {}) {
    const response = await apiClient.get("/services", { params });
    return response.data;
  },

  async getServiceById(id) {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  },

  async createService(data) {
    const response = await apiClient.post("/services", data);
    return response.data;
  },

  async updateService(id, data) {
    const response = await apiClient.put(`/services/${id}`, data);
    return response.data;
  },

  async deleteService(id) {
    const response = await apiClient.delete(`/services/${id}`);
    return response.data;
  },

  async getSchedulesByServiceId(serviceId) {
    const response = await apiClient.get("/schedules", {
      params: { serviceId },
    });
    return response.data;
  },

  async createSchedule(data) {
    const response = await apiClient.post("/schedules", data);
    return response.data;
  },

  async deleteSchedule(id) {
    const response = await apiClient.delete(`/schedules/${id}`);
    return response.data;
  },
};
