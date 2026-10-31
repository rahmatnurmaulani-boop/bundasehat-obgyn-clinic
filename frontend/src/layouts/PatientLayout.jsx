import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, User, LogOut, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PatientLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Topbar Pasien */}
      <header className="bg-white border-b border-clinic-border sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center text-gold shadow-sm">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-navy text-lg leading-none block">
              BundaSehat
            </span>
            <span className="text-[10px] text-gold uppercase tracking-wider font-bold block mt-0.5">
              Portal Pasien
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-navy">
              {user?.name || "Pasien"}
            </p>
            <p className="text-[11px] text-clinic-muted">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-xs btn-outline border-clinic-border text-navy hover:bg-rose-soft hover:text-rose-muted gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>
        </div>
      </header>

      {/* Konten & Navigasi Tab */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex-1">
        <div className="flex border-b border-clinic-border mb-6 space-x-6">
          <Link
            to="/patient/appointments"
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              isActive("/patient/appointments")
                ? "border-navy text-navy font-bold"
                : "border-transparent text-clinic-muted hover:text-navy"
            }`}
          >
            <Calendar className="w-4 h-4" /> Janji Temu Saya
          </Link>
          <Link
            to="/patient/profile"
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              isActive("/patient/profile")
                ? "border-navy text-navy font-bold"
                : "border-transparent text-clinic-muted hover:text-navy"
            }`}
          >
            <User className="w-4 h-4" /> Data Profil Pasien
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
