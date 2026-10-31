import React from "react";
import { Link } from "react-router-dom";
import { HeartCrack, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-soft flex items-center justify-center text-rose-muted">
        <HeartCrack className="w-8 h-8" />
      </div>
      <h1 className="text-5xl font-extrabold text-navy">404</h1>
      <h2 className="text-xl font-bold text-navy">Halaman Tidak Ditemukan</h2>
      <p className="text-clinic-muted max-w-md text-sm">
        Halaman yang Bunda tuju mungkin telah dipindahkan atau alamat yang
        dimasukkan keliru.
      </p>
      <Link to="/" className="btn btn-primary btn-sm gap-2 mt-4">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
      </Link>
    </div>
  );
}
