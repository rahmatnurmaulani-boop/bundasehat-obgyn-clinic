import React from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="badge-maternity">Kontak & Lokasi</span>
        <h1 className="text-4xl font-extrabold text-navy">
          Hubungi Klinik BundaSehat
        </h1>
        <p className="text-clinic-muted text-sm sm:text-base">
          Kami siap menyambut dan mendampingi perjalanan kehamilan Bunda dengan
          sepenuh hati.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="clinic-card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-navy">Informasi Klinik</h2>

          <div className="space-y-4 text-sm text-clinic-text">
            <div className="flex gap-4 items-start">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-navy">Alamat Lengkap</p>
                <p className="text-clinic-muted">
                  Jl. Kesehatan Ibu & Anak No. 45, Kebayoran, Jakarta Selatan
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-navy">WhatsApp / Telepon</p>
                <p className="text-clinic-muted">
                  (021) 789-0123 / 0812-3456-7890
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-navy">Jam Operasional Pelayanan</p>
                <p className="text-clinic-muted">
                  Senin - Sabtu: 09:00 - 17:00 WIB (Minggu Libur)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Kontak Cepat */}
        <div className="clinic-card p-8 space-y-4">
          <h2 className="text-2xl font-bold text-navy">
            Kirim Pesan / Pertanyaan
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nama Bunda / Ayah"
              className="clinic-input"
            />
            <input
              type="text"
              placeholder="Nomor WhatsApp"
              className="clinic-input"
            />
            <textarea
              placeholder="Tuliskan pertanyaan Bunda..."
              rows="4"
              className="clinic-input"
            ></textarea>
            <button className="btn btn-primary w-full gap-2">
              <Send className="w-4 h-4" /> Kirim Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
