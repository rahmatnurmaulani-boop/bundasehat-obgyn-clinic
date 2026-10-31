import React, { useState, useEffect } from "react";
import { doctorService } from "../../services/doctorService";
import TableSkeleton from "../../components/dashboard/TableSkeleton";
import AlertBanner from "../../components/common/AlertBanner";
import Modal from "../../components/common/Modal";
import {
  Plus,
  Trash2,
  Clock,
  GraduationCap,
  Award,
  Stethoscope,
} from "lucide-react";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "Spesialis Obstetri & Ginekologi",
    experience: "10 Tahun Pengalaman",
    education: "Fakultas Kedokteran UI",
    schedule_info: "Senin - Jumat (09:00 - 15:00)",
    bio: "",
    image_url:
      "https://images.unsplash.com/photo-1594824813576-2d1252d43171?w=500&auto=format&fit=crop&q=80",
  });

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await doctorService.getDoctors();
      setDoctors(res.data || []);
    } catch (err) {
      setAlert({ type: "error", message: "Gagal mengambil data dokter." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await doctorService.createDoctor(formData);
      setAlert({
        type: "success",
        message:
          "Dokter baru berhasil ditambahkan dan tampil di halaman utama!",
      });
      setIsModalOpen(false);
      setFormData({
        name: "",
        specialty: "Spesialis Obstetri & Ginekologi",
        experience: "10 Tahun Pengalaman",
        education: "Fakultas Kedokteran UI",
        schedule_info: "Senin - Jumat (09:00 - 15:00)",
        bio: "",
        image_url:
          "https://images.unsplash.com/photo-1594824813576-2d1252d43171?w=500&auto=format&fit=crop&q=80",
      });
      fetchDoctors();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Gagal menambahkan dokter.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDoctor = async (id, name) => {
    if (!window.confirm(`Yakin ingin menghapus dokter "${name}" dari sistem?`))
      return;
    try {
      await doctorService.deleteDoctor(id);
      setAlert({ type: "success", message: "Data dokter berhasil dihapus." });
      fetchDoctors();
    } catch (err) {
      setAlert({ type: "error", message: "Gagal menghapus dokter." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-gold" /> Manajemen Tim Dokter
            Spesialis
          </h2>
          <p className="text-xs text-clinic-muted">
            Dokter yang ditambahkan di sini akan otomatis tampil di Beranda &
            Halaman Dokter untuk pasien
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-sm btn-primary gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Dokter Baru
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
          <TableSkeleton rows={3} />
        ) : doctors.length === 0 ? (
          <div className="p-12 text-center text-clinic-muted text-sm">
            Belum ada data dokter di klinik. Silakan tambahkan dokter baru.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full min-w-[650px] text-left text-xs">
              <thead className="bg-ivory border-b border-clinic-border text-navy uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Foto & Nama Dokter</th>
                  <th className="py-3 px-4">Spesialisasi</th>
                  <th className="py-3 px-4">Pendidikan & Pengalaman</th>
                  <th className="py-3 px-4">Jadwal Praktek</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clinic-border">
                {doctors.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={doc.image_url}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover border border-clinic-border"
                      />
                      <div>
                        <p className="font-bold text-navy text-sm">
                          {doc.name}
                        </p>
                        <p className="text-[11px] text-clinic-muted line-clamp-1 max-w-xs">
                          {doc.bio}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gold-dark">
                      {doc.specialty}
                    </td>
                    <td className="py-3 px-4 space-y-0.5">
                      <p className="text-navy font-semibold">{doc.education}</p>
                      <span className="badge-maternity text-[9px]">
                        {doc.experience}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-navy">
                      <Clock className="w-3.5 h-3.5 text-dusty inline mr-1" />
                      {doc.schedule_info}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteDoctor(doc.id, doc.name)}
                        className="btn btn-xs btn-outline border-rose-300 text-rose-600 hover:bg-rose-50"
                        title="Hapus Dokter"
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

      {/* Modal Tambah Dokter */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Dokter Spesialis Baru"
      >
        <form onSubmit={handleCreateDoctor} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">
              Nama Lengkap & Gelar
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: dr. Amanda Putri, Sp.OG (K)"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="clinic-input"
            />
          </div>
          <div>
            <label className="font-bold text-navy block mb-1">
              Spesialisasi Medis
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Spesialis Kebidanan & USG 4D Fetomaternal"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              className="clinic-input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">
                Pengalaman Praktek
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: 10 Tahun Pengalaman"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="clinic-input"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">
                Alumnus Universitas
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: FK Universitas Indonesia"
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
                className="clinic-input"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-navy block mb-1">
              Informasi Jadwal Praktek
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Senin - Kamis (09:00 - 15:00)"
              value={formData.schedule_info}
              onChange={(e) =>
                setFormData({ ...formData, schedule_info: e.target.value })
              }
              className="clinic-input"
            />
          </div>
          <div>
            <label className="font-bold text-navy block mb-1">
              URL Foto Dokter
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              className="clinic-input"
            />
          </div>
          <div>
            <label className="font-bold text-navy block mb-1">
              Biografi Singkat
            </label>
            <textarea
              rows={2}
              placeholder="Fokus keahlian dan riwayat penanganan pasien..."
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
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
              {submitting ? "Menyimpan..." : "Simpan & Publikasikan"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
