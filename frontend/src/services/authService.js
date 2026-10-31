import apiClient from "./apiClient";

export const authService = {
  async register(userData) {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  async login(credentials) {
    const response = await apiClient.post("/auth/login", credentials);
    if (response.data.data?.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
