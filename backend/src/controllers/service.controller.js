const serviceService = require("../services/service.service");
const { successResponse } = require("../utils/response.util");

class ServiceController {
  async getAll(req, res, next) {
    try {
      const { search, category, is_active, page, limit } = req.query;
      const result = await serviceService.getAllServices({
        search,
        category,
        isActive: is_active,
        page,
        limit,
      });
      return successResponse(
        res,
        "Berhasil mendapatkan daftar layanan",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await serviceService.getServiceById(id);
      return successResponse(
        res,
        "Berhasil mendapatkan detail layanan",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const result = await serviceService.createService(req.body);
      return successResponse(res, "Layanan baru berhasil dibuat", result, 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = await serviceService.updateService(id, req.body);
      return successResponse(res, "Layanan berhasil diperbarui", result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await serviceService.deleteService(id);
      return successResponse(res, "Layanan berhasil dihapus", null);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ServiceController();
