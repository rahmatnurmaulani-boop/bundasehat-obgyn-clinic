import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Calendar,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import { medicalService } from "../../services/medicalService";
import { doctorService } from "../../services/doctorService";
import { mockArticles } from "../../data/mockArticles";
import { formatCurrency } from "../../utils/formatters";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function HomePage() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultDoctorPhoto =
    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&auto=format&fit=crop&q=80";

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, doctorsRes] = await Promise.all([
          medicalService.getServices({ limit: 3 }),
          doctorService.getDoctors(),
        ]);

        setFeaturedServices(servicesRes.data?.services || []);
        setDoctors(doctorsRes.data?.slice(0, 3) || []);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-ivory to-ivory pt-12 pb-20 border-b border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 badge-maternity">
                <Sparkles className="w-3.5 h-3.5" /> Pelayanan Kebidanan & Obgyn
                Premium
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-navy leading-[1.15] tracking-tight">
                Mendampingi Tiap Detak Jantung Buah Hati Bunda
              </h1>
              <p className="text-clinic-muted text-base sm:text-lg leading-relaxed max-w-xl">
                Nikmati kenyamanan konsultasi dokter spesialis obgyn, USG 4D HD
                Live jernih, dan reservasi online terjadwal bebas antre
                berlama-lama.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/booking"
                  className="btn btn-primary gap-2 px-7 text-base shadow-lg shadow-navy/15"
                >
                  <Calendar className="w-5 h-5 text-gold" /> Buat Janji Temu
                </Link>
                <Link
                  to="/services"
                  className="btn btn-outline border-navy text-navy hover:bg-navy px-6"
                >
                  Lihat Semua Layanan
                </Link>
              </div>

              <div className="pt-6 border-t border-clinic-border flex items-center gap-8 text-xs text-clinic-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dokter
                  Spesialis Berpengalaman
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />{" "}
                  Teknologi USG 4D Realtime
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80"
                  alt="Ibu hamil dan dokter kandungan BundaSehat"
                  className="rounded-3xl shadow-luxury object-cover h-[340px] sm:h-[450px] w-full border-4 border-white"
                />

                <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-luxury border border-clinic-border flex items-center gap-3 sm:gap-4 max-w-xs mx-auto sm:mx-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-soft flex items-center justify-center text-rose-muted font-bold flex-shrink-0">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-clinic-muted font-semibold">
                      Tingkat Kepuasan Pasien
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-navy flex items-center gap-1">
                      4.9 / 5.0{" "}
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="badge-maternity">Layanan Unggulan</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
            Pemeriksaan Khusus Bunda & Janin
          </h2>
          <p className="text-clinic-muted text-sm sm:text-base">
            Seluruh layanan dirancang cermat dengan durasi yang memadai untuk
            konsultasi mendalam.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner message="Mengambil daftar layanan dari server..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((svc) => (
              <div
                key={svc.id}
                className="clinic-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="badge-maternity">{svc.category}</span>
                    <span className="text-xs font-semibold text-clinic-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />{" "}
                      {svc.duration_minutes} Menit
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {svc.name}
                  </h3>
                  <p className="text-sm text-clinic-muted line-clamp-3 leading-relaxed mb-6">
                    {svc.description ||
                      "Pemeriksaan komprehensif bersama dokter spesialis obgyn."}
                  </p>
                </div>
                <div className="pt-4 border-t border-clinic-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-clinic-muted block">
                      Tarif Layanan
                    </span>
                    <span className="text-lg font-extrabold text-navy">
                      {formatCurrency(svc.price)}
                    </span>
                  </div>
                  <Link to="/booking" className="btn btn-sm btn-primary">
                    Pilih Jadwal
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Doctors Preview (DENGAN FALLBACK FOTO OTOMATIS) */}
      <section className="bg-white py-16 border-y border-clinic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="badge-maternity">Tim Medis Terpercaya</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2">
                Dokter Spesialis Obgyn Kami
              </h2>
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-1 text-sm font-bold text-navy hover:text-gold transition-colors"
            >
              Lihat Profil Seluruh Dokter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner message="Mengambil data tim dokter..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {doctors.map((doc) => (
                <div key={doc.id} className="clinic-card overflow-hidden group">
                  <img
                    src={doc.image_url || doc.image || defaultDoctorPhoto}
                    alt={doc.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultDoctorPhoto;
                    }}
                    className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-navy">{doc.name}</h3>
                    <p className="text-xs text-gold font-bold">
                      {doc.specialty}
                    </p>
                    <p className="text-xs text-clinic-muted flex items-center gap-1.5 pt-2">
                      <Clock className="w-3.5 h-3.5 text-dusty" />{" "}
                      {doc.schedule_info || doc.schedule}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="badge-maternity">Edukasi Kehamilan</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">
              Artikel & Tips Kesehatan Terkini
            </h2>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-1 text-sm font-bold text-navy hover:text-gold transition-colors"
          >
            Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockArticles.map((art) => (
            <div
              key={art.id}
              className="clinic-card overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img
                  src={art.image}
                  alt={art.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6 space-y-2">
                  <span className="badge-maternity text-[10px]">
                    {art.category}
                  </span>
                  <h3 className="text-base font-bold text-navy leading-snug hover:text-gold transition-colors">
                    <Link to="/articles">{art.title}</Link>
                  </h3>
                  <p className="text-xs text-clinic-muted line-clamp-2 leading-relaxed pt-1">
                    {art.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 text-xs text-clinic-muted border-t border-clinic-border/60 pt-3">
                Ditulis oleh{" "}
                <span className="font-semibold text-navy">{art.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
