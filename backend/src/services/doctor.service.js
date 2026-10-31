const doctorRepository = require("../repositories/doctor.repository");

class DoctorService {
  async getAllDoctors() {
    return await doctorRepository.findAll();
  }

  async getDoctorById(id) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
      const error = new Error("Data dokter tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    return doctor;
  }

  async createDoctor(data) {
    const id = await doctorRepository.create(data);
    return await doctorRepository.findById(id);
  }

  async updateDoctor(id, data) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
      const error = new Error("Data dokter tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    await doctorRepository.update(id, data);
    return await doctorRepository.findById(id);
  }

  async deleteDoctor(id) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
      const error = new Error("Data dokter tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    return await doctorRepository.delete(id);
  }
}

module.exports = new DoctorService();
