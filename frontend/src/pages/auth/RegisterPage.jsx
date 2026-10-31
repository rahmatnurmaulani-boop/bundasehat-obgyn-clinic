import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Lock, Phone, UserPlus } from "lucide-react";
import AlertBanner from "../../components/common/AlertBanner";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registrasi gagal. Pastikan data benar.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-navy">Registrasi Pasien Baru</h3>
        <p className="text-xs text-clinic-muted mt-1">
          Buat akun untuk kemudahan reservasi janji temu dokter
        </p>
      </div>

      {error && (
        <AlertBanner
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <div className="space-y-1">
        <label className="text-xs font-semibold text-navy">
          Nama Lengkap Pasien
        </label>
        <div className="relative">
          <input
            type="text"
            required
            placeholder="Ny. Sarah Anindita"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="clinic-input pl-10"
          />
          <User className="w-4 h-4 text-clinic-muted absolute left-3.5 top-3" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-navy">Alamat Email</label>
        <div className="relative">
          <input
            type="email"
            required
            placeholder="sarah@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="clinic-input pl-10"
          />
          <Mail className="w-4 h-4 text-clinic-muted absolute left-3.5 top-3" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-navy">
          Nomor WhatsApp / HP
        </label>
        <div className="relative">
          <input
            type="tel"
            required
            placeholder="081234567890"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="clinic-input pl-10"
          />
          <Phone className="w-4 h-4 text-clinic-muted absolute left-3.5 top-3" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-navy">
          Kata Sandi (Min 6 Karakter)
        </label>
        <div className="relative">
          <input
            type="password"
            required
            minLength={6}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="clinic-input pl-10"
          />
          <Lock className="w-4 h-4 text-clinic-muted absolute left-3.5 top-3" />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-full mt-4 gap-2"
      >
        <UserPlus className="w-4 h-4" />{" "}
        {submitting ? "Mendaftarkan..." : "Daftar Sekarang"}
      </button>

      <div className="pt-4 border-t border-clinic-border text-center text-xs text-clinic-muted">
        Sudah memiliki akun?{" "}
        <Link
          to="/login"
          className="font-bold text-navy hover:text-gold transition-colors"
        >
          Masuk di Sini
        </Link>
      </div>
    </form>
  );
}
