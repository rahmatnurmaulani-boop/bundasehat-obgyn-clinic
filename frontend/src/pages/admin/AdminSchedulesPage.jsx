import React, { useState, useEffect } from "react";
import { medicalService } from "../../services/medicalService";
import TableSkeleton from "../../components/dashboard/TableSkeleton";
import AlertBanner from "../../components/common/AlertBanner";
import Modal from "../../components/common/Modal";
import { Plus, Trash2, Calendar, Clock } from "lucide-react";

export default function AdminSchedulesPage() {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    day_of_week: "Monday",
    start_time: "09:00",
    end_time: "17:00",
    slot_capacity: 1,
  });

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await medicalService.getServices({ limit: 50 });
        const list = res.data.services || [];
        setServices(list);
        if (list.length > 0) {
          setSelectedServiceId(list[0].id);
        }
      } catch (e) {
        setAlert({ type: "error", message: "Gagal memuat daftar layanan." });
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const fetchSchedules = async () => {
    if (!selectedServiceId) return;
    setLoading(true);
    try {
      const res =
        await medicalService.getSchedulesByServiceId(selectedServiceId);
      setSchedules(res.data || []);
    } catch (err) {
      setAlert({ type: "error", message: "Gagal mengambil jadwal layanan." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [selectedServiceId]);

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await medicalService.createSchedule({
        service_id: Number(selectedServiceId),
        day_of_week: formData.day_of_week,
        start_time: `${formData.start_time}:00`,
        end_time: `${formData.end_time}:00`,
        slot_capacity: Number(formData.slot_capacity),
      });
      setAlert({
        type: "success",
        message: "Jadwal operasional berhasil ditambahkan.",
      });
      setIsModalOpen(false);
      fetchSchedules();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Gagal menambahkan jadwal.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!window.confirm("Yakin ingin menghapus slot jadwal ini?")) return;
    try {
      await medicalService.deleteSchedule(id);
      setAlert({ type: "success", message: "Slot jadwal berhasil dihapus." });
      fetchSchedules();
    } catch (err) {
      setAlert({ type: "error", message: "Gagal menghapus jadwal." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">
            Jadwal Praktek Dokter & Layanan
          </h2>
          <p className="text-xs text-clinic-muted">
            Atur hari operasional dan kuota antrean pasien per sesi
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="clinic-input text-xs font-bold"
          >
            {services.map((svc) => (
              <option key={svc.id} value={svc.id}>
                {svc.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-sm btn-primary whitespace-nowrap gap-1"
          >
            <Plus className="w-4 h-4" /> Tambah Slot
          </button>
        </div>
      </div>

      {alert && (
        <AlertBanner
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="clinic-card overflow-hidden">
        {loading ? (
          <TableSkeleton rows={4} />
        ) : schedules.length === 0 ? (
          <div className="p-12 text-center text-clinic-muted text-sm">
            Belum ada jadwal praktek yang dikonfigurasi untuk layanan ini.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full min-w-[650px] text-left text-xs">
              <thead className="bg-ivory border-b border-clinic-border text-navy uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Hari Praktek</th>
                  <th className="py-3 px-4">Jam Operasional</th>
                  <th className="py-3 px-4">Kuota Pasien Per Sesi</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clinic-border">
                {schedules.map((sch) => (
                  <tr
                    key={sch.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-navy text-sm">
                      <Calendar className="w-4 h-4 text-gold inline mr-2" />
                      {sch.day_of_week}
                    </td>
                    <td className="py-3 px-4 font-semibold text-clinic-text">
                      <Clock className="w-3.5 h-3.5 text-dusty inline mr-1" />
                      {sch.start_time.slice(0, 5)} - {sch.end_time.slice(0, 5)}{" "}
                      WIB
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge-maternity text-[10px]">
                        {sch.slot_capacity} Pasien
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteSchedule(sch.id)}
                        className="btn btn-xs btn-outline border-rose-300 text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Tambah Jadwal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Slot Jadwal Operasional"
      >
        <form onSubmit={handleCreateSchedule} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">Hari Kerja</label>
            <select
              value={formData.day_of_week}
              onChange={(e) =>
                setFormData({ ...formData, day_of_week: e.target.value })
              }
              className="clinic-input"
            >
              <option value="Monday">Senin (Monday)</option>
              <option value="Tuesday">Selasa (Tuesday)</option>
              <option value="Wednesday">Rabu (Wednesday)</option>
              <option value="Thursday">Kamis (Thursday)</option>
              <option value="Friday">Jumat (Friday)</option>
              <option value="Saturday">Sabtu (Saturday)</option>
              <option value="Sunday">Minggu (Sunday)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Jam Buka</label>
              <input
                type="time"
                required
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
                className="clinic-input"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">
                Jam Tutup
              </label>
              <input
                type="time"
                required
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
                className="clinic-input"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-navy block mb-1">
              Kapasitas Slot
            </label>
            <input
              type="number"
              min={1}
              required
              value={formData.slot_capacity}
              onChange={(e) =>
                setFormData({ ...formData, slot_capacity: e.target.value })
              }
              className="clinic-input"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-clinic-border">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-outline border-clinic-border"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-sm btn-primary"
            >
              {submitting ? "Menyimpan..." : "Simpan Jadwal"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
