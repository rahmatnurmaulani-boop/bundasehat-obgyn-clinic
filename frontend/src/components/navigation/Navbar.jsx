import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Calendar,
  Menu,
  X,
  User,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Klinik", path: "/about" },
    { name: "Layanan Medis", path: "/services" },
    { name: "Dokter Spesialis", path: "/doctors" },
    { name: "Artikel", path: "/articles" },
    { name: "FAQ", path: "/faq" },
    { name: "Kontak", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-clinic-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. SISI KIRI: Logo Brand */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-navy flex items-center justify-center text-gold shadow-sm group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-navy block leading-none">
                BundaSehat
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-gold block mt-1">
                Obgyn & Maternity Care
              </span>
            </div>
          </Link>

          {/* 2. SISI TENGAH: Menu Navigasi Proporsional */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-navy font-bold bg-ivory shadow-xs"
                    : "text-clinic-muted hover:text-navy hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. SISI KANAN: Akun Pengguna & CTA Button */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            {isAuthenticated ? (
              // KETIKA SUDAH LOGIN: Tampilan Akun Bersih & Proporsional
              <>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-clinic-border bg-ivory hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-navy text-gold text-xs font-bold flex items-center justify-center shadow-xs">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="text-left hidden md:block">
                      <p className="text-xs font-bold text-navy leading-tight truncate max-w-[120px]">
                        {user?.name}
                      </p>
                      <p className="text-[10px] text-clinic-muted font-medium capitalize leading-none mt-0.5">
                        {user?.role === "admin" ? "Staf Medis" : "Pasien"}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-clinic-muted ml-0.5" />
                  </label>

                  {/* Dropdown Menu Akun */}
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow-luxury bg-white rounded-2xl w-56 border border-clinic-border mt-3 space-y-1"
                  >
                    <li className="px-3 py-2 border-b border-clinic-border text-xs">
                      <p className="font-bold text-navy truncate">
                        {user?.name}
                      </p>
                      <p className="text-[11px] text-clinic-muted truncate">
                        {user?.email}
                      </p>
                      <span className="badge-maternity text-[9px] mt-1.5 inline-block">
                        {user?.role === "admin"
                          ? "Akses Resepsionis"
                          : "Pasien Terdaftar"}
                      </span>
                    </li>

                    {user?.role === "admin" ? (
                      <li>
                        <Link
                          to="/admin/overview"
                          className="text-xs font-semibold text-navy py-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-gold" />{" "}
                          Dashboard Admin
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/patient/appointments"
                            className="text-xs font-semibold text-navy py-2"
                          >
                            <LayoutDashboard className="w-4 h-4 text-rose-muted" />{" "}
                            Portal Janji Temu
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/patient/profile"
                            className="text-xs font-semibold text-navy py-2"
                          >
                            <User className="w-4 h-4 text-navy" /> Profil Saya
                          </Link>
                        </li>
                      </>
                    )}

                    <li className="border-t border-clinic-border pt-1">
                      <button
                        onClick={handleLogout}
                        className="text-xs font-bold text-rose-600 hover:bg-rose-50 py-2"
                      >
                        <LogOut className="w-4 h-4" /> Keluar (Logout)
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Tombol Janji Temu Utama */}
                <Link
                  to="/booking"
                  className="btn btn-sm btn-primary gap-1.5 px-4 shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-gold" /> Janji Temu
                </Link>
              </>
            ) : (
              // KETIKA BELUM LOGIN
              <>
                <Link
                  to="/login"
                  className="btn btn-sm btn-ghost text-navy font-semibold text-xs px-4"
                >
                  Masuk Pasien
                </Link>
                <Link
                  to="/booking"
                  className="btn btn-sm btn-primary gap-1.5 px-4 shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-gold" /> Janji Temu
                </Link>
              </>
            )}
          </div>

          {/* Tampilan Mobile: Hamburger */}
          <div className="xl:hidden flex items-center gap-2">
            <Link
              to="/booking"
              className="btn btn-xs btn-primary gap-1 sm:hidden"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" /> Booking
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-navy hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6 text-navy" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-clinic-border bg-white px-5 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive(link.path)
                  ? "bg-rose-soft text-navy font-bold"
                  : "text-clinic-text hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-clinic-border space-y-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-4 py-2.5 bg-ivory rounded-xl text-xs space-y-1 border border-clinic-border">
                  <p className="font-bold text-navy">{user?.name}</p>
                  <p className="text-clinic-muted">{user?.email}</p>
                  <span className="badge-maternity text-[9px] mt-1 inline-block">
                    {user?.role === "admin"
                      ? "Staf Medis / Admin"
                      : "Pasien Terdaftar"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {user?.role === "admin" ? (
                    <Link
                      to="/admin/overview"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-outline btn-sm text-navy justify-center"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/patient/appointments"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-outline btn-sm text-navy justify-center"
                    >
                      Portal Pasien
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="btn btn-error btn-outline btn-sm justify-center"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline btn-sm text-navy justify-center"
                >
                  Masuk Pasien
                </Link>
                <Link
                  to="/booking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-sm justify-center"
                >
                  Janji Temu
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
