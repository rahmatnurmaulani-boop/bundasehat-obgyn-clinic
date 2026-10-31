const reportService = require("../services/report.service");
const { successResponse } = require("../utils/response.util");

class ReportController {
  async getSummary(req, res, next) {
    try {
      const report = await reportService.getSummaryReport();
      return successResponse(
        res,
        "Laporan analisis bisnis berhasil didapatkan",
        report,
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();
