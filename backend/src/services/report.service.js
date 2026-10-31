const reportRepository = require("../repositories/report.repository");

class ReportService {
  async getSummaryReport() {
    const [metrics, popularServices, busiestDays, peakHours] =
      await Promise.all([
        reportRepository.getMetricsSummary(),
        reportRepository.getPopularServices(5),
        reportRepository.getBusiestDays(),
        reportRepository.getPeakHours(),
      ]);

    return {
      metrics: {
        total_bookings: Number(metrics.total_bookings),
        total_completed: Number(metrics.total_completed),
        total_pending: Number(metrics.total_pending),
        total_cancelled: Number(metrics.total_cancelled),
        total_revenue: Number(metrics.total_revenue),
      },
      popular_services: popularServices,
      busiest_days: busiestDays,
      peak_hours: peakHours,
    };
  }
}

module.exports = new ReportService();
