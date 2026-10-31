const scheduleRepository = require("../repositories/schedule.repository");
const serviceRepository = require("../repositories/service.repository");

class ScheduleService {
  async getSchedulesByService(serviceId) {
    return await scheduleRepository.findByServiceId(serviceId);
  }

  async createSchedule(data) {
    // Validasi layanan ada atau tidak
    const service = await serviceRepository.findById(data.service_id);
    if (!service) {
      const error = new Error("Layanan tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    const scheduleId = await scheduleRepository.create(data);
    return { id: scheduleId, ...data };
  }

  async deleteSchedule(id) {
    const success = await scheduleRepository.delete(id);
    if (!success) {
      const error = new Error("Jadwal tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    return true;
  }
}

module.exports = new ScheduleService();
