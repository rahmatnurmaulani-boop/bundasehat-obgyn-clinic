import React from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Phone, ShieldCheck, Heart, Info } from "lucide-react";

export default function PatientProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-navy">Data Profil Pasien</h2>
        <p className="text-xs text-clinic-muted">
          Informasi identitas akun dan rekam kontak Bunda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kartu Profil Utama */}
        <div className="clinic-card p-6 md:col-span-1 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-soft text-rose-muted font-bold text-2xl flex items-center justify-center mx-auto shadow-inner border border-rose-muted/20">
            {user?.name?.charAt(0) || "P"}
          </div>
          <div>
            <h3 className="font-bold text-navy text-lg">{user?.name}</h3>
            <span className="badge-maternity text-[10px] mt-1">
              Pasien Terdaftar
            </span>
          </div>
          <div className="pt-4 border-t border-clinic-border text-xs text-clinic-muted flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Akun
            Terverifikasi
          </div>
        </div>

        {/* Rincian Informasi Kontak */}
        <div className="clinic-card p-6 md:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-navy border-b border-clinic-border pb-3">
            Informasi Kontak Resmi
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-ivory rounded-xl border border-clinic-border">
              <Mail className="w-5 h-5 text-gold flex-shrink-0" />
              <div>
                <p className="text-xs text-clinic-muted">Alamat Email</p>
                <p className="font-bold text-navy">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-ivory rounded-xl border border-clinic-border">
              <Phone className="w-5 h-5 text-gold flex-shrink-0" />
              <div>
                <p className="text-xs text-clinic-muted">
                  Nomor WhatsApp / Telepon
                </p>
                <p className="font-bold text-navy">
                  {user?.phone || "Belum ditambahkan"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-ivory rounded-xl border border-clinic-border">
              <Heart className="w-5 h-5 text-rose-muted flex-shrink-0" />
              <div>
                <p className="text-xs text-clinic-muted">Status Keanggotaan</p>
                <p className="font-bold text-navy">
                  Pasien Rawat Jalan BundaSehat Care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panduan Kunjungan Ibu Hamil */}
      <div className="clinic-card p-6 bg-gradient-to-r from-white via-ivory to-rose-soft/30 border border-clinic-border flex items-start gap-4">
        <Info className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
        <div className="space-y-1 text-xs text-clinic-muted leading-relaxed">
          <h4 className="font-bold text-navy text-sm">
            Panduan Kunjungan Konsultasi
          </h4>
          <p>
            • Harap membawa Buku KIA (Kesehatan Ibu dan Anak) atau riwayat USG
            sebelumnya jika ada.
          </p>
          <p>
            • Disarankan minum air putih 1 jam sebelum pemeriksaan USG untuk
            kualitas gambar yang lebih jernih.
          </p>
          <p>
            • Konfirmasi kehadiran di meja resepsionis 15 menit sebelum jam sesi
            dimulai.
          </p>
        </div>
      </div>
    </div>
  );
}
