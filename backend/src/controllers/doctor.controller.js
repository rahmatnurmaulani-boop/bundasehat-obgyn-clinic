const doctorService = require("../services/doctor.service");
const { successResponse } = require("../utils/response.util");

class DoctorController {
  async getAll(req, res, next) {
    try {
      const doctors = await doctorService.getAllDoctors();
      return successResponse(res, "Daftar dokter berhasil diambil", doctors);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.id);
      return successResponse(res, "Detail dokter berhasil diambil", doctor);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const doctor = await doctorService.createDoctor(req.body);
      return successResponse(
        res,
        "Dokter baru berhasil ditambahkan",
        doctor,
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const doctor = await doctorService.updateDoctor(req.params.id, req.body);
      return successResponse(res, "Profil dokter berhasil diperbarui", doctor);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await doctorService.deleteDoctor(req.params.id);
      return successResponse(res, "Dokter berhasil dihapus dari sistem", null);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DoctorController();
