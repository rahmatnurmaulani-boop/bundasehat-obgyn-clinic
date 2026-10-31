import apiClient from "./apiClient";

export const reportService = {
  async getSummary() {
    const response = await apiClient.get("/reports/summary");
    return response.data; // { success, message, data: { metrics, popular_services, busiest_days, peak_hours } }
  },
};
