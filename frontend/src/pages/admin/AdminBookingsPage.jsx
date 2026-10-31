import React, { useState, useEffect } from "react";
import { bookingService } from "../../services/bookingService";
import {
  formatCurrency,
  formatDateIndo,
  formatTime,
} from "../../utils/formatters";
import StatusBadge from "../../components/common/StatusBadge";
import TableSkeleton from "../../components/dashboard/TableSkeleton";
import AlertBanner from "../../components/common/AlertBanner";
import { CheckCircle2, CheckCheck, Ban, Bell, Radio } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [alert, setAlert] = useState(null);
  const [realtimeNotification, setRealtimeNotification] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getBookings({
        status: statusFilter || undefined,
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      setAlert({
        type: "error",
        message: "Gagal mengambil data antrean pasien.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  // 🔔 REAL-TIME EVENT STREAM (Server-Sent Events)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const eventSource = new EventSource(
      `http://localhost:5000/api/v1/bookings/live-stream?token=${token}`,
    );

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === "BOOKING_CREATED") {
          setRealtimeNotification(
            `🔔 Ada Pasien Baru! Kode: ${payload.data.booking_code} (${payload.data.service_name})`,
          );
          fetchBookings(); // Auto refresh daftar tabel antrean!
        }
      } catch (e) {
        console.error(e);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await bookingService.updateStatus(id, newStatus);
      setAlert({
        type: "success",
        message: `Status berhasil diubah menjadi [${newStatus}]`,
      });
      fetchBookings();
    } catch (err) {
      setAlert({ type: "error", message: "Gagal memperbarui status." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
            Manajemen Antrean Booking Pasien
            <span className="badge badge-success text-white gap-1 text-[10px] py-2">
              <Radio className="w-3 h-3 animate-pulse" /> Live Stream
            </span>
          </h2>
          <p className="text-xs text-clinic-muted">
            Kelola status kedatangan, verifikasi jadwal dokter, dan konfirmasi
            periksa
          </p>
        </div>

        {/* Filter Status */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {["", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-navy text-white"
                  : "bg-white border border-clinic-border text-clinic-muted hover:bg-slate-50"
              }`}
            >
              {st === "" ? "Semua" : st}
            </button>
          ))}
        </div>
      </div>

      {realtimeNotification && (
        <AlertBanner
          type="info"
          message={realtimeNotification}
          onClose={() => setRealtimeNotification(null)}
        />
      )}

      {alert && (
        <AlertBanner
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="clinic-card overflow-hidden">
        {loading ? (
          <TableSkeleton rows={5} />
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-clinic-muted text-sm">
            Tidak ada data antrean pasien untuk kategori ini.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full min-w-[650px] text-left text-xs">
              <thead className="bg-ivory border-b border-clinic-border text-navy uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Kode / Pasien</th>
                  <th className="py-3 px-4">Layanan Medis</th>
                  <th className="py-3 px-4">Jadwal Periksa</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Biaya</th>
                  <th className="py-3 px-4 text-center">Aksi Resepsionis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clinic-border">
                {bookings.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <p className="font-extrabold text-navy font-mono text-xs">
                        {item.booking_code}
                      </p>
                      <p className="font-semibold text-clinic-text text-sm">
                        {item.customer_name}
                      </p>
                      <p className="text-[11px] text-clinic-muted">
                        {item.customer_email}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-navy">{item.service_name}</p>
                      <span className="badge-maternity text-[9px] mt-0.5">
                        {item.service_category}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-y-0.5">
                      <p className="font-semibold text-navy">
                        {formatDateIndo(item.booking_date)}
                      </p>
                      <p className="text-clinic-muted">
                        {formatTime(item.start_time)} -{" "}
                        {formatTime(item.end_time)}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-4 font-bold text-navy">
                      {formatCurrency(item.total_price)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {item.status === "PENDING" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(item.id, "CONFIRMED")
                            }
                            className="btn btn-xs btn-success text-white gap-1"
                            title="Konfirmasi Kehadiran"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Konfirmasi
                          </button>
                        )}
                        {item.status === "CONFIRMED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(item.id, "COMPLETED")
                            }
                            className="btn btn-xs btn-primary gap-1"
                            title="Selesaikan Konsultasi"
                          >
                            <CheckCheck className="w-3 h-3" /> Selesai
                          </button>
                        )}
                        {["PENDING", "CONFIRMED"].includes(item.status) && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(item.id, "CANCELLED")
                            }
                            className="btn btn-xs btn-outline border-rose-300 text-rose-700 hover:bg-rose-50"
                            title="Batalkan"
                          >
                            <Ban className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
