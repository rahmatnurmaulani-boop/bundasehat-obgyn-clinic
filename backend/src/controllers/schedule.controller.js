const scheduleService = require("../services/schedule.service");
const { successResponse } = require("../utils/response.util");

class ScheduleController {
  async getByService(req, res, next) {
    try {
      const { serviceId } = req.query;
      if (!serviceId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Parameter query serviceId diperlukan",
          });
      }
      const result = await scheduleService.getSchedulesByService(serviceId);
      return successResponse(
        res,
        "Jadwal ketersediaan berhasil diambil",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const result = await scheduleService.createSchedule(req.body);
      return successResponse(
        res,
        "Jadwal layanan berhasil ditambahkan",
        result,
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await scheduleService.deleteSchedule(id);
      return successResponse(res, "Jadwal berhasil dihapus", null);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ScheduleController();
