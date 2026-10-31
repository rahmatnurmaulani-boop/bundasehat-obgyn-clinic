import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { medicalService } from "../../services/medicalService";
import { bookingService } from "../../services/bookingService";
import StepIndicator from "../../components/booking/StepIndicator";
import ServiceSelector from "../../components/booking/ServiceSelector";
import TimeSlotSelector from "../../components/booking/TimeSlotSelector";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import AlertBanner from "../../components/common/AlertBanner";
import { formatCurrency } from "../../utils/formatters";
import { CalendarCheck, ArrowRight, ArrowLeft } from "lucide-react";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await medicalService.getServices({ limit: 10 });
        setServices(res.data.services || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const steps = [
    "Pilih Layanan",
    "Pilih Waktu",
    "Data Pasien & Catatan",
    "Konfirmasi",
  ];

  const handleNext = () => {
    setError("");
    if (currentStep === 1 && !selectedService) {
      return setError(
        "Silakan pilih salah satu layanan medis terlebih dahulu.",
      );
    }
    if (currentStep === 2 && (!bookingDate || !startTime)) {
      return setError("Silakan tentukan tanggal dan jam konsultasi.");
    }
    if (currentStep === 3 && !isAuthenticated) {
      return navigate("/login");
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitBooking = async () => {
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        service_id: selectedService.id,
        booking_date: bookingDate,
        start_time: startTime,
        notes,
      };
      const res = await bookingService.createBooking(payload);
      // Kirim data booking hasil API ke state router
      navigate("/booking/success", { state: { booking: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memproses reservasi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Menyiapkan data reservasi..." />;

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-6 space-y-2">
        <span className="badge-maternity">Reservasi Online Terjadwal</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">
          Buat Janji Temu Dokter
        </h1>
      </div>

      <StepIndicator currentStep={currentStep} steps={steps} />

      {error && (
        <AlertBanner
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <div className="clinic-card p-6 sm:p-8 mt-6">
        {/* Step 1: Layanan */}
        {currentStep === 1 && (
          <ServiceSelector
            services={services}
            selectedService={selectedService}
            onSelect={(svc) => setSelectedService(svc)}
          />
        )}

        {/* Step 2: Tanggal & Jam */}
        {currentStep === 2 && (
          <TimeSlotSelector
            bookingDate={bookingDate}
            setBookingDate={setBookingDate}
            startTime={startTime}
            setStartTime={setStartTime}
          />
        )}

        {/* Step 3: Pasien & Catatan Medis */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-navy">
              Data Pasien & Catatan Khusus
            </h3>
            <div className="bg-ivory p-4 rounded-xl border border-clinic-border text-sm space-y-1">
              <p className="font-bold text-navy">
                {user?.name} (Pasien Terdaftar)
              </p>
              <p className="text-xs text-clinic-muted">
                Email: {user?.email} | No. HP: {user?.phone || "-"}
              </p>
            </div>
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-navy">
                Usia Kehamilan & Catatan / Keluhan (Opsional)
              </label>
              <textarea
                rows={3}
                placeholder="Contoh: Usia kehamilan 28 minggu, ingin melihat detak jantung janin dan USG 4D..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="clinic-input"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review Akhir */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-navy">
              Tinjau Rincian Reservasi
            </h3>
            <div className="clinic-card bg-ivory p-5 space-y-3 text-sm">
              <div className="flex justify-between border-b border-clinic-border pb-2">
                <span className="text-clinic-muted">Layanan Medis</span>
                <span className="font-bold text-navy">
                  {selectedService?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-clinic-border pb-2">
                <span className="text-clinic-muted">Jadwal Kunjungan</span>
                <span className="font-bold text-navy">
                  {bookingDate} | {startTime} WIB
                </span>
              </div>
              <div className="flex justify-between border-b border-clinic-border pb-2">
                <span className="text-clinic-muted">Perkiraan Durasi</span>
                <span className="font-bold text-navy">
                  {selectedService?.duration_minutes} Menit
                </span>
              </div>
              <div className="flex justify-between border-b border-clinic-border pb-2">
                <span className="text-clinic-muted">Nama Pasien</span>
                <span className="font-bold text-navy">{user?.name}</span>
              </div>
              {notes && (
                <div className="flex justify-between border-b border-clinic-border pb-2">
                  <span className="text-clinic-muted">Catatan</span>
                  <span className="font-medium text-navy text-right max-w-xs">
                    {notes}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 text-base">
                <span className="font-bold text-navy">
                  Total Biaya Konsultasi
                </span>
                <span className="font-extrabold text-gold text-lg">
                  {formatCurrency(selectedService?.price)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigasi Tombol */}
        <div className="flex justify-between items-center pt-8 mt-6 border-t border-clinic-border">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="btn btn-sm btn-outline border-clinic-border text-navy gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="btn btn-sm btn-primary gap-2"
            >
              Lanjutkan <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitBooking}
              disabled={submitting}
              className="btn btn-primary gap-2 px-6"
            >
              <CalendarCheck className="w-4 h-4 text-gold" />
              {submitting
                ? "Menghubungkan ke Server..."
                : "Konfirmasi & Simpan Booking"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
