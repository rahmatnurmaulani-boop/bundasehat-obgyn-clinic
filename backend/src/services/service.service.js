const serviceRepository = require("../repositories/service.repository");
const scheduleRepository = require("../repositories/schedule.repository");

class ServiceService {
  async getAllServices(filters) {
    return await serviceRepository.findAll(filters);
  }

  async getServiceById(id) {
    const service = await serviceRepository.findById(id);
    if (!service) {
      const error = new Error("Layanan tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    const schedules = await scheduleRepository.findByServiceId(id);
    return { ...service, schedules };
  }

  async createService(data) {
    // 1. Simpan layanan baru ke database
    const serviceId = await serviceRepository.create(data);

    // 2. Otomatis jadwal senin -  jumat (09:00 - 17:00 WIB)
    const defaultDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    for (const day of defaultDays) {
      await scheduleRepository.create({
        service_id: serviceId,
        day_of_week: day,
        start_time: "09:00:00",
        end_time: "17:00:00",
        slot_capacity: 1,
        is_active: 1,
      });
    }

    return await serviceRepository.findById(serviceId);
  }

  async updateService(id, data) {
    const existing = await serviceRepository.findById(id);
    if (!existing) {
      const error = new Error("Layanan tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    await serviceRepository.update(id, data);
    return await serviceRepository.findById(id);
  }

  async deleteService(id) {
    const existing = await serviceRepository.findById(id);
    if (!existing) {
      const error = new Error("Layanan tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    return await serviceRepository.delete(id);
  }
}

module.exports = new ServiceService();
