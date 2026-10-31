import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";
import AlertBanner from "../../components/common/AlertBanner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await login({ email, password });
      if (data.user.role === "admin") {
        navigate("/admin/overview");
      } else {
        navigate("/patient/appointments");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-navy">Masuk ke Akun</h3>
        <p className="text-xs text-clinic-muted mt-1">
          Akses jadwal janji temu dan riwayat konsultasi medis
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
          Email Terdaftar
        </label>
        <div className="relative">
          <input
            type="email"
            required
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="clinic-input pl-10"
          />
          <Mail className="w-4 h-4 text-clinic-muted absolute left-3.5 top-3" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-navy">Kata Sandi</label>
        <div className="relative">
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <LogIn className="w-4 h-4" />{" "}
        {submitting ? "Memverifikasi..." : "Masuk Sekarang"}
      </button>

      <div className="pt-4 border-t border-clinic-border text-center text-xs text-clinic-muted">
        Belum memiliki akun pasien?{" "}
        <Link
          to="/register"
          className="font-bold text-navy hover:text-gold transition-colors"
        >
          Daftar Pasien Baru
        </Link>
      </div>
    </form>
  );
}
