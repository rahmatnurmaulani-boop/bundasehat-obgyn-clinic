import React, { useState, useEffect } from "react";
import { medicalService } from "../../services/medicalService";
import { formatCurrency } from "../../utils/formatters";
import TableSkeleton from "../../components/dashboard/TableSkeleton";
import AlertBanner from "../../components/common/AlertBanner";
import Modal from "../../components/common/Modal";
import { Plus, Trash2, Clock, Stethoscope } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Pemeriksaan Kehamilan",
    price: "",
    duration_minutes: 45,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await medicalService.getServices({ limit: 50 });
      setServices(res.data.services || []);
    } catch (err) {
      setAlert({ type: "error", message: "Gagal mengambil katalog layanan." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await medicalService.createService({
        ...formData,
        price: Number(formData.price),
        duration_minutes: Number(formData.duration_minutes),
      });
      setAlert({
        type: "success",
        message: "Layanan baru berhasil ditambahkan ke database.",
      });
      setIsModalOpen(false);
      setFormData({
        name: "",
        description: "",
        category: "Pemeriksaan Kehamilan",
        price: "",
        duration_minutes: 45,
      });
      fetchServices();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Gagal membuat layanan.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Yakin ingin menghapus layanan "${name}"?`)) return;
    try {
      await medicalService.deleteService(id);
      setAlert({ type: "success", message: "Layanan berhasil dihapus." });
      fetchServices();
    } catch (err) {
      setAlert({
        type: "error",
        message:
          "Gagal menghapus layanan (mungkin terkait dengan jadwal/booking).",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-navy">
            Master Layanan Medis Klinik
          </h2>
          <p className="text-xs text-clinic-muted">
            Kelola tarif, durasi menit konsultasi, dan kategori layanan
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-sm btn-primary gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Layanan
        </button>
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
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full min-w-[650px] text-left text-xs">
              <thead className="bg-ivory border-b border-clinic-border text-navy uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Nama Layanan Medis</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Durasi Sesi</th>
                  <th className="py-3 px-4">Tarif Layanan</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clinic-border">
                {services.map((svc) => (
                  <tr
                    key={svc.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <p className="font-bold text-navy text-sm">{svc.name}</p>
                      <p className="text-clinic-muted line-clamp-1">
                        {svc.description}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge-maternity text-[10px]">
                        {svc.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-navy">
                      <Clock className="w-3.5 h-3.5 text-gold inline mr-1" />{" "}
                      {svc.duration_minutes} Menit
                    </td>
                    <td className="py-3 px-4 font-extrabold text-navy text-sm">
                      {formatCurrency(svc.price)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(svc.id, svc.name)}
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

      {/* Modal Tambah Layanan */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Layanan Medis Baru"
      >
        <form onSubmit={handleCreate} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">
              Nama Layanan
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: USG Fetomaternal Tingkat Lanjut"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="clinic-input"
            />
          </div>
          <div>
            <label className="font-bold text-navy block mb-1">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="clinic-input"
            >
              <option value="Pemeriksaan Kehamilan">
                Pemeriksaan Kehamilan
              </option>
              <option value="Program Hamil">Program Hamil</option>
              <option value="Kesehatan Wanita">Kesehatan Wanita</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">
                Tarif (Rp)
              </label>
              <input
                type="number"
                required
                placeholder="400000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="clinic-input"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">
                Durasi (Menit)
              </label>
              <input
                type="number"
                required
                value={formData.duration_minutes}
                onChange={(e) =>
                  setFormData({ ...formData, duration_minutes: e.target.value })
                }
                className="clinic-input"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-navy block mb-1">
              Deskripsi Layanan
            </label>
            <textarea
              rows={2}
              placeholder="Penjelasan ringkas seputar pemeriksaan..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
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
              {submitting ? "Menyimpan..." : "Simpan Layanan"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
