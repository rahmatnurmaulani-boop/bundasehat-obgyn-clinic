import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-10 border-t border-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center text-navy font-bold">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                BundaSehat
              </span>
            </div>
            <p className="text-sm text-dusty-light leading-relaxed">
              Klinik Spesialis Kebidanan & Kandungan terpercaya dengan pelayanan
              hangat, teknologi USG 4D mutakhir, dan komitmen kesehatan holistik
              bagi Bunda & Janin.
            </p>
          </div>

          {/* Kolom 2: Layanan Medis */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider text-gold uppercase">
              Layanan Spesialis
            </h4>
            <ul className="space-y-2 text-sm text-dusty-light">
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  Pemeriksaan Kehamilan & USG
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  USG 4D HD Live Real-Time
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  Konsultasi Program Hamil (Promil)
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  Kesehatan Organ Reproduksi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Navigasi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider text-gold uppercase">
              Navigasi Pasien
            </h4>
            <ul className="space-y-2 text-sm text-dusty-light">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  Profil Dokter & Klinik
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="hover:text-white transition-colors"
                >
                  Reservasi Janji Temu
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Pertanyaan Umum (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition-colors"
                >
                  Portal Masuk Pasien / Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Jam Buka */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider text-gold uppercase">
              Kontak & Praktek
            </h4>
            <div className="space-y-2.5 text-sm text-dusty-light">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                <span>Jl. Kesehatan Ibu & Anak No. 45, Jakarta Selatan</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>(021) 789-0123 / 0812-3456-7890</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Senin - Sabtu: 09:00 - 17:00 WIB</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-light/40 flex flex-col sm:flex-row items-center justify-between text-xs text-dusty-light gap-4">
          <p>
            © {new Date().getFullYear()} BundaSehat Obgyn & Maternity Care. All
            rights reserved.
          </p>
          <p className="text-slate-400">
            Final Project Full Stack Web Development Bootcamp
          </p>
        </div>
      </div>
    </footer>
  );
}
