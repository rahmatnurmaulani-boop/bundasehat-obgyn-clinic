import React from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";

export default function TimeSlotSelector({
  bookingDate,
  setBookingDate,
  startTime,
  setStartTime,
  schedules,
}) {
  // Slot jam umum klinik
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
  ];

  // Minimal tanggal adalah hari ini
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-navy flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gold" /> 1. Tentukan Tanggal
          Kunjungan
        </label>
        <input
          type="date"
          min={today}
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="clinic-input max-w-sm"
        />
        <p className="text-xs text-clinic-muted">
          Klinik beroperasi hari Senin sampai Sabtu (09:00 - 17:00 WIB).
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-navy flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold" /> 2. Pilih Jam Sesi Konsultasi
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-2">
          {timeSlots.map((slot) => {
            const isSelected = startTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setStartTime(slot)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? "bg-navy text-gold border-navy shadow-sm"
                    : "bg-white text-navy border-clinic-border hover:bg-rose-soft"
                }`}
              >
                {slot} WIB
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
