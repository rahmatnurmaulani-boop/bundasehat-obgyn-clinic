import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle2, Home, ArrowRight } from "lucide-react";
import {
  formatCurrency,
  formatDateIndo,
  formatTime,
} from "../../utils/formatters";

export default function BookingSuccessPage() {
  const location = useLocation();
  const booking = location.state?.booking;

  // Jika di-refresh tanpa data state, arahkan kembali ke booking
  if (!booking) {
    return <Navigate to="/booking" replace />;
  }

  return (
    <div className="py-16 max-w-lg mx-auto px-4 text-center">
      <div className="clinic-card p-8 space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="badge-maternity">Reservasi Berhasil</span>
          <h2 className="text-2xl font-bold text-navy mt-2">
            Janji Temu Diterima
          </h2>
          <p className="text-xs text-clinic-muted mt-1">
            Harap hadir di klinik 15 menit sebelum jam konsultasi
          </p>
        </div>

        <div className="bg-ivory p-4 rounded-xl border border-clinic-border text-left space-y-2.5 text-xs">
          <div className="flex justify-between border-b border-clinic-border pb-2">
            <span className="text-clinic-muted">Nomor Resi / Booking Code</span>
            <span className="font-extrabold text-navy text-sm font-mono">
              {booking.booking_code}
            </span>
          </div>
          <div className="flex justify-between border-b border-clinic-border pb-2">
            <span className="text-clinic-muted">Layanan Medis</span>
            <span className="font-bold text-navy">{booking.service_name}</span>
          </div>
          <div className="flex justify-between border-b border-clinic-border pb-2">
            <span className="text-clinic-muted">Tanggal Konsultasi</span>
            <span className="font-bold text-navy">
              {formatDateIndo(booking.booking_date)}
            </span>
          </div>
          <div className="flex justify-between border-b border-clinic-border pb-2">
            <span className="text-clinic-muted">Jam Sesi</span>
            <span className="font-bold text-navy">
              {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
            </span>
          </div>
          <div className="flex justify-between pt-1 text-sm">
            <span className="font-bold text-navy">Total Biaya</span>
            <span className="font-extrabold text-gold">
              {formatCurrency(booking.total_price)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            to="/patient/appointments"
            className="btn btn-primary btn-sm gap-2 w-full"
          >
            Lihat Janji Temu Saya <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="btn btn-ghost btn-sm text-navy w-full gap-2">
            <Home className="w-4 h-4" /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
