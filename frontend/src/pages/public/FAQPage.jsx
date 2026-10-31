import React from "react";

export default function FAQPage() {
  const faqs = [
    {
      q: "Kapan waktu terbaik melakukan USG 4D di BundaSehat?",
      a: "Waktu paling ideal adalah pada usia kehamilan 26 hingga 30 minggu, di mana cairan ketuban masih cukup dan struktur wajah janin sudah terbentuk sempurna.",
    },
    {
      q: "Bagaimana jika saya terlambat datang dari jam reservasi?",
      a: "Kami menganjurkan Bunda datang 15 menit sebelum jam janji temu. Apabila terlambat melebihi durasi sesi layanan, jadwal mungkin perlu disesuaikan dengan antrean berikutnya.",
    },
    {
      q: "Apakah bisa melakukan pembatalan booking janji temu?",
      a: "Bisa. Bunda dapat membatalkan janji temu melalui Portal Pasien selama status pesanan belum selesai (COMPLETED).",
    },
    {
      q: "Metode pembayaran apa saja yang diterima di klinik?",
      a: "Saat ini klinik menerima pembayaran tunai di kasir resepsionis, transfer bank, dan QRIS saat Bunda hadir di klinik.",
    },
  ];

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3">
        <span className="badge-maternity">Bantuan & Informasi</span>
        <h1 className="text-4xl font-extrabold text-navy">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h1>
        <p className="text-clinic-muted text-sm sm:text-base">
          Temukan jawaban cepat seputar pemeriksaan kehamilan dan alur reservasi
          di BundaSehat.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="collapse collapse-plus clinic-card p-2">
            <input
              type="radio"
              name="faq-accordion"
              defaultChecked={idx === 0}
            />
            <div className="collapse-title text-base font-bold text-navy">
              {faq.q}
            </div>
            <div className="collapse-content text-sm text-clinic-muted leading-relaxed">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
