import React, { useState, useEffect } from "react";
import { reportService } from "../../services/reportService";
import { formatCurrency } from "../../utils/formatters";
import StatCard from "../../components/dashboard/StatCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import AlertBanner from "../../components/common/AlertBanner";
import {
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await reportService.getSummary();
        setReport(res.data);
      } catch (err) {
        setError("Gagal mengambil laporan analitik dari server.");
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, []);

  if (loading)
    return <LoadingSpinner message="Menganalisis data transaksi klinik..." />;

  const { metrics, popular_services, busiest_days, peak_hours } = report || {};

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy">
          Ringkasan Operasional & Keuangan
        </h2>
        <p className="text-xs text-clinic-muted">
          Laporan statistik performa klinik berdasarkan data transaksi riil
        </p>
      </div>

      {error && <AlertBanner type="error" message={error} />}

      {/* 4 Kartu Metrik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Reservasi"
          value={metrics?.total_bookings || 0}
          icon={Users}
          subtitle="Seluruh antrean terdaftar"
          color="navy"
        />
        <StatCard
          title="Pasien Selesai"
          value={metrics?.total_completed || 0}
          icon={CheckCircle2}
          subtitle="Konsultasi telah terlaksana"
          color="emerald"
        />
        <StatCard
          title="Menunggu Konfirmasi"
          value={metrics?.total_pending || 0}
          icon={Clock}
          subtitle="Perlu konfirmasi resepsionis"
          color="rose"
        />
        <StatCard
          title="Estimasi Omzet"
          value={formatCurrency(metrics?.total_revenue || 0)}
          icon={DollarSign}
          subtitle="Dari pesanan sah & selesai"
          color="gold"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Layanan Terlaris */}
        <div className="clinic-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-clinic-border pb-3">
            <h3 className="font-bold text-navy text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold" /> Layanan Medis Paling
              Diminati
            </h3>
            <span className="badge-maternity text-[10px]">Top 5 Layanan</span>
          </div>

          <div className="space-y-3">
            {popular_services?.map((svc, idx) => (
              <div
                key={svc.service_id}
                className="flex items-center justify-between p-3 bg-ivory rounded-xl border border-clinic-border text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-navy text-gold font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-navy text-sm">
                      {svc.service_name}
                    </p>
                    <p className="text-clinic-muted">{svc.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-navy text-sm">
                    {svc.total_bookings} Kali
                  </span>
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    {formatCurrency(svc.total_earned)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hari & Jam Paling Ramai */}
        <div className="clinic-card p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-bold text-navy text-base flex items-center gap-2 border-b border-clinic-border pb-3">
              <Calendar className="w-4 h-4 text-gold" /> Hari Praktek Paling
              Padat
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {busiest_days?.map((day) => (
                <div
                  key={day.day_name}
                  className="p-3 bg-ivory rounded-xl border border-clinic-border text-center"
                >
                  <p className="font-bold text-navy text-sm">{day.day_name}</p>
                  <p className="text-xs text-gold-dark font-extrabold mt-1">
                    {day.total_bookings} Pasien
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-navy text-base flex items-center gap-2 border-b border-clinic-border pb-3">
              <Clock className="w-4 h-4 text-gold" /> Jam Sesi Konsultasi Paling
              Sibuk
            </h3>
            <div className="flex flex-wrap gap-2">
              {peak_hours?.map((hour) => (
                <span
                  key={hour.time_slot}
                  className="px-3 py-1.5 bg-rose-soft text-navy border border-rose-muted/20 rounded-xl text-xs font-bold"
                >
                  {hour.time_slot} WIB ({hour.total_bookings} Booking)
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
