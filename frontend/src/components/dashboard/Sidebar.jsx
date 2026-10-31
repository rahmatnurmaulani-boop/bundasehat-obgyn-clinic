import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Stethoscope,
  Clock,
  LogOut,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const menus = [
    { name: "Ringkasan Laporan", path: "/admin/overview", icon: BarChart3 },
    {
      name: "Kelola Antrean Booking",
      path: "/admin/appointments",
      icon: Calendar,
    },
    {
      name: "Master Layanan Medis",
      path: "/admin/services",
      icon: Stethoscope,
    },
    { name: "Jadwal Praktek Dokter", path: "/admin/schedules", icon: Clock },
    { name: "Manajemen Tim Dokter", path: "/admin/doctors", icon: ShieldCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-full md:w-64 bg-navy text-white flex-shrink-0 flex flex-col justify-between p-5 border-r border-navy-dark min-h-screen">
      <div className="space-y-6">
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center text-navy font-bold shadow-md">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight block">
              BundaSehat
            </span>
            <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">
              Dashboard Admin
            </span>
          </div>
        </Link>

        <nav className="space-y-1">
          {menus.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-gold text-navy font-bold shadow-sm"
                    : "text-dusty-light hover:bg-navy-light hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-navy-light/40 space-y-3">
        <div className="px-2">
          <p className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />{" "}
            {user?.name || "Resepsionis"}
          </p>
          <p className="text-[11px] text-dusty-light">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-outline border-navy-light text-white hover:bg-rose-muted hover:border-rose-muted w-full gap-2"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>
    </aside>
  );
}
