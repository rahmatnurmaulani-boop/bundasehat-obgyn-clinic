import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex w-12 h-12 rounded-2xl bg-navy items-center justify-center text-gold shadow-md mb-3">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h2 className="text-3xl font-extrabold text-navy">BundaSehat Care</h2>
        <p className="text-xs uppercase tracking-widest text-gold font-bold mt-1">
          Portal Pasien & Resepsionis
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="clinic-card p-8 shadow-luxury">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
