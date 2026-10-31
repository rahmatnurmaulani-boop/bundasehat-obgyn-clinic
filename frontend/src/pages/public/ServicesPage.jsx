import React, { useState, useEffect } from "react";
import { medicalService } from "../../services/medicalService";
import { formatCurrency } from "../../utils/formatters";
import { Search, Clock, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Pagination from "../../components/common/Pagination";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await medicalService.getServices({
        search,
        category,
        page,
        limit: 6,
      });
      setServices(res.data.services || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchServices();
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="badge-maternity">Katalog Medis</span>
        <h1 className="text-4xl font-extrabold text-navy">
          Layanan Medis & Fasilitas USG
        </h1>
        <p className="text-clinic-muted text-sm sm:text-base">
          Temukan layanan pemeriksaan kehamilan, konsultasi kesuburan, dan
          kesehatan wanita sesuai kebutuhan Bunda.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="clinic-card p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Cari layanan (cth: USG, Promil)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="clinic-input pr-10"
          />
          <button
            type="submit"
            className="absolute right-3 top-3 text-clinic-muted hover:text-navy"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            "",
            "Pemeriksaan Kehamilan",
            "Program Hamil",
            "Kesehatan Wanita",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                category === cat
                  ? "bg-navy text-white"
                  : "bg-ivory text-clinic-text hover:bg-slate-200"
              }`}
            >
              {cat === "" ? "Semua Kategori" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layanan */}
      {loading ? (
        <LoadingSpinner message="Menghubungkan ke database klinik..." />
      ) : services.length === 0 ? (
        <div className="clinic-card p-12 text-center text-clinic-muted">
          <AlertCircle className="w-10 h-10 mx-auto text-gold mb-3" />
          <h3 className="font-bold text-navy text-lg">
            Tidak Ada Layanan Ditemukan
          </h3>
          <p className="text-sm mt-1">
            Coba gunakan kata kunci pencarian yang lain.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
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
                <h3 className="text-xl font-bold text-navy mb-2">{svc.name}</h3>
                <p className="text-sm text-clinic-muted line-clamp-3 leading-relaxed mb-6">
                  {svc.description ||
                    "Pemeriksaan medis berkualitas bersama dokter spesialis obgyn."}
                </p>
              </div>

              <div className="pt-4 border-t border-clinic-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-clinic-muted block">
                    Biaya Layanan
                  </span>
                  <span className="text-lg font-extrabold text-navy">
                    {formatCurrency(svc.price)}
                  </span>
                </div>
                <Link to="/booking" className="btn btn-sm btn-primary gap-1">
                  <Calendar className="w-4 h-4" /> Reservasi
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
