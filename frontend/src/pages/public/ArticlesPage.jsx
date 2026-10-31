import React from "react";
import { mockArticles } from "../../data/mockArticles";

export default function ArticlesPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="badge-maternity">Pusat Edukasi</span>
        <h1 className="text-4xl font-extrabold text-navy">
          Informasi & Artikel Medis Kehamilan
        </h1>
        <p className="text-clinic-muted text-sm sm:text-base">
          Panduan terpercaya dari dokter spesialis kami seputar kehamilan, USG,
          dan perawatan reproduksi.
        </p>
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
                className="h-52 w-full object-cover"
              />
              <div className="p-6 space-y-2">
                <div className="flex justify-between items-center text-xs text-clinic-muted">
                  <span className="badge-maternity text-[10px]">
                    {art.category}
                  </span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-lg font-bold text-navy leading-snug pt-1">
                  {art.title}
                </h3>
                <p className="text-xs text-clinic-muted leading-relaxed pt-1">
                  {art.summary}
                </p>
              </div>
            </div>
            <div className="p-6 pt-0 border-t border-clinic-border/60 text-xs text-clinic-muted mt-4">
              Narasumber:{" "}
              <span className="font-bold text-navy">{art.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
