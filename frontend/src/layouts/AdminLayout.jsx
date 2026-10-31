import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Stethoscope,
  Clock,
  LogOut,
  Heart,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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

  const NavItems = () => (
    <nav className="space-y-1.5">
      {menus.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileSidebarOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              isActive(item.path)
                ? "bg-gold text-navy font-bold shadow-sm"
                : "text-dusty-light hover:bg-navy-light hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header (Hanya muncul di HP & Tablet kecil) */}
      <div className="md:hidden bg-navy text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-40 border-b border-navy-dark shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gold flex items-center justify-center text-navy font-bold">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-sm block leading-none">
              BundaSehat
            </span>
            <span className="text-[9px] text-gold uppercase tracking-wider block mt-0.5">
              Admin Portal
            </span>
          </div>
        </Link>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-white hover:bg-navy-light transition-colors"
          aria-label="Toggle Sidebar"
        >
          {mobileSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Drawer Modal */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-navy/70 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative w-72 bg-navy text-white flex flex-col justify-between p-5 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-navy-light/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gold flex items-center justify-center text-navy font-bold">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-bold text-sm">Menu Dashboard</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <NavItems />
            </div>

            <div className="pt-6 border-t border-navy-light/40 space-y-3">
              <div className="px-1 text-xs">
                <p className="font-bold text-white truncate">
                  {user?.name || "Resepsionis"}
                </p>
                <p className="text-[11px] text-dusty-light truncate">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline border-navy-light text-white hover:bg-rose-muted w-full gap-2"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (Permanen di Layar Besar) */}
      <aside className="hidden md:flex w-64 bg-navy text-white flex-shrink-0 flex-col justify-between p-5 border-r border-navy-dark min-h-screen sticky top-0 h-screen overflow-y-auto">
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
          <NavItems />
        </div>

        <div className="pt-6 border-t border-navy-light/40 space-y-3">
          <div className="px-2">
            <p className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />{" "}
              {user?.name || "Resepsionis"}
            </p>
            <p className="text-[11px] text-dusty-light truncate">
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-outline border-navy-light text-white hover:bg-rose-muted hover:border-rose-muted w-full gap-2"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto w-full max-w-full">
        <Outlet />
      </main>
    </div>
  );
}
