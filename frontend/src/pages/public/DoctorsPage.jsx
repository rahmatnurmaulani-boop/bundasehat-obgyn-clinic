import React, { useState, useEffect } from "react";
import { doctorService } from "../../services/doctorService";
import { Clock, GraduationCap, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultDoctorPhoto =
    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&auto=format&fit=crop&q=80";

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await doctorService.getDoctors();
        setDoctors(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDoctors();
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="badge-maternity">Tim Medis Terpercaya</span>
        <h1 className="text-4xl font-extrabold text-navy">
          Dokter Spesialis Kebidanan & Kandungan
        </h1>
        <p className="text-clinic-muted text-sm sm:text-base">
          Konsultasikan kesehatan kehamilan dan organ reproduksi Bunda bersama
          para dokter spesialis terbaik kami.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Mengambil daftar dokter spesialis..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="clinic-card overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img
                  src={doc.image_url || doc.image || defaultDoctorPhoto}
                  alt={doc.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultDoctorPhoto;
                  }}
                  className="h-72 w-full object-cover"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-navy">{doc.name}</h3>
                  <p className="text-xs text-gold font-bold tracking-wide">
                    {doc.specialty}
                  </p>
                  <p className="text-xs text-clinic-muted leading-relaxed">
                    {doc.bio}
                  </p>

                  <div className="pt-3 border-t border-clinic-border space-y-2 text-xs text-clinic-muted">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-dusty" />{" "}
                      {doc.education}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-dusty" />{" "}
                      {doc.schedule_info || doc.schedule}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/booking"
                  className="btn btn-primary btn-sm w-full gap-2"
                >
                  <Calendar className="w-4 h-4" /> Buat Janji Konsultasi
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
