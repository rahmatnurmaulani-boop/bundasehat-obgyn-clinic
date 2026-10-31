import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookingService } from "../../services/bookingService";
import {
  formatCurrency,
  formatDateIndo,
  formatTime,
} from "../../utils/formatters";
import StatusBadge from "../../components/common/StatusBadge";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import AlertBanner from "../../components/common/AlertBanner";
import Modal from "../../components/common/Modal";
import {
  Calendar,
  Clock,
  AlertTriangle,
  Plus,
  FileText,
  Ban,
} from "lucide-react";

export default function PatientDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [bannerAlert, setBannerAlert] = useState(null); // <-- Menggunakan bannerAlert (bukan 'alert')

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getBookings({
        status: statusFilter || undefined,
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      setBannerAlert({
        type: "error",
        message: "Gagal mengambil riwayat reservasi.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleCancelBooking = async () => {
    if (!selectedBookingToCancel) return;
    setCancelling(true);
    try {
      await bookingService.cancelBooking(selectedBookingToCancel.id);
      setBannerAlert({
        type: "success",
        message: "Janji temu berhasil dibatalkan.",
      });
      setSelectedBookingToCancel(null);
      fetchBookings();
    } catch (err) {
      setBannerAlert({
        type: "error",
        message: err.response?.data?.message || "Gagal membatalkan janji temu.",
      });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">
            Jadwal & Riwayat Janji Temu
          </h2>
          <p className="text-xs text-clinic-muted">
            Pantau status konfirmasi kedatangan dan jadwal pemeriksaan dokter
          </p>
        </div>
        <Link
          to="/booking"
          className="btn btn-sm btn-primary gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Reservasi Baru
        </Link>
      </div>

      {bannerAlert && (
        <AlertBanner
          type={bannerAlert.type}
          message={bannerAlert.message}
          onClose={() => setBannerAlert(null)}
        />
      )}

      {/* Filter Status Tab */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { label: "Semua", value: "" },
          { label: "Menunggu", value: "PENDING" },
          { label: "Dikonfirmasi", value: "CONFIRMED" },
          { label: "Selesai", value: "COMPLETED" },
          { label: "Dibatalkan", value: "CANCELLED" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === tab.value
                ? "bg-navy text-white shadow-sm"
                : "bg-white border border-clinic-border text-clinic-muted hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Konten Daftar Janji Temu */}
      {loading ? (
        <LoadingSpinner message="Mengambil daftar janji temu Bunda..." />
      ) : bookings.length === 0 ? (
        <EmptyState
          title="Tidak Ada Jadwal Ditemukan"
          description="Bunda belum memiliki jadwal janji temu dengan dokter spesialis untuk kategori ini."
          actionText="Buat Janji Temu Sekarang"
          actionLink="/booking"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((item) => (
            <div
              key={item.id}
              className="clinic-card p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-mono text-clinic-muted block">
                      Kode Reservasi:
                    </span>
                    <span className="text-sm font-extrabold text-navy font-mono">
                      {item.booking_code}
                    </span>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <div className="pt-2 border-t border-clinic-border">
                  <h4 className="text-base font-bold text-navy">
                    {item.service_name}
                  </h4>
                  <span className="badge-maternity text-[10px] mt-1">
                    {item.service_category}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-clinic-muted pt-1">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold" />{" "}
                    {formatDateIndo(item.booking_date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold" />{" "}
                    {formatTime(item.start_time)} - {formatTime(item.end_time)}
                  </p>
                  {item.notes && (
                    <p className="flex items-start gap-2 pt-1 text-[11px] text-slate-600 bg-ivory p-2 rounded-lg">
                      <FileText className="w-3.5 h-3.5 text-dusty flex-shrink-0 mt-0.5" />
                      <span>{item.notes}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Bagian Bawah: Biaya & Aksi Pembatalan */}
              <div className="pt-4 border-t border-clinic-border flex items-center justify-between mt-4">
                <div>
                  <span className="text-[11px] text-clinic-muted block">
                    Tarif
                  </span>
                  <span className="text-sm font-extrabold text-navy">
                    {formatCurrency(item.total_price)}
                  </span>
                </div>

                {["PENDING", "CONFIRMED"].includes(item.status) && (
                  <button
                    onClick={() => setSelectedBookingToCancel(item)}
                    className="btn btn-xs btn-outline border-rose-300 text-rose-700 hover:bg-rose-50 gap-1"
                  >
                    <Ban className="w-3 h-3" /> Batalkan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog Konfirmasi Pembatalan */}
      <Modal
        isOpen={!!selectedBookingToCancel}
        onClose={() => setSelectedBookingToCancel(null)}
        title="Konfirmasi Pembatalan Janji Temu"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-clinic-text">
            Apakah Bunda yakin ingin membatalkan janji temu untuk{" "}
            <strong>{selectedBookingToCancel?.service_name}</strong> pada
            tanggal{" "}
            <strong>
              {formatDateIndo(selectedBookingToCancel?.booking_date)}
            </strong>
            ?
          </p>
          <div className="flex gap-3 pt-4 border-t border-clinic-border">
            <button
              onClick={() => setSelectedBookingToCancel(null)}
              className="btn btn-sm btn-outline border-clinic-border flex-1"
            >
              Kembali
            </button>
            <button
              onClick={handleCancelBooking}
              disabled={cancelling}
              className="btn btn-sm btn-error text-white flex-1"
            >
              {cancelling ? "Membatalkan..." : "Ya, Batalkan"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
