import React from "react";
import { Heart, ShieldCheck, Sparkles, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge-maternity">Profil Klinik</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-navy">
          Klinik Spesialis Kebidanan & Kandungan BundaSehat
        </h1>
        <p className="text-clinic-muted text-base leading-relaxed">
          Berdiri dengan visi memberikan pelayanan medis obstetri dan ginekologi
          yang berempati, terstandarisasi, dan mengutamakan kenyamanan
          psikologis calon ibu dan keluarga.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
          alt="Ruang tunggu klinik modern"
          className="rounded-3xl shadow-luxury border border-clinic-border h-96 w-full object-cover"
        />
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">
            Misi Pelayanan Kami
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-gold flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-navy">Akurasi Diagnosa Medis</h4>
                <p className="text-sm text-clinic-muted">
                  Didukung teknologi USG resolusi tinggi dan dokter konsultan
                  berpengalaman.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-rose-soft flex items-center justify-center text-rose-muted flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-navy">
                  Kenyamanan Ramah Ibu & Bayi
                </h4>
                <p className="text-sm text-clinic-muted">
                  Ruang periksa privat, ramah anak, dan suasana ruang tunggu
                  yang menenangkan.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-dusty/20 flex items-center justify-center text-navy flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-navy">
                  Sistem Reservasi Terjadwal
                </h4>
                <p className="text-sm text-clinic-muted">
                  Waktu Bunda sangat berharga. Kami membatasi antrean dengan
                  sistem jadwal presisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
