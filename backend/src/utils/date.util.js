/**
 * Utility Helper untuk Manipulasi Tanggal dan Waktu
 */

const calculateEndTime = (startTime, durationMinutes) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const date = new Date(2000, 0, 1, hours, minutes);
  date.setMinutes(date.getMinutes() + durationMinutes);

  const endHour = String(date.getHours()).padStart(2, "0");
  const endMinute = String(date.getMinutes()).padStart(2, "0");
  return `${endHour}:${endMinute}:00`;
};

// Parser tanggal lokal yang kebal pergeseran UTC
const getDayName = (dateString) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // Jam lokal aman
  return dayNames[date.getDay()];
};

const getTodayDateString = () => {
  return new Date().toISOString().slice(0, 10);
};

const isDateInPast = (dateString) => {
  const today = getTodayDateString();
  return dateString < today;
};

const generateBookingCode = () => {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BK-${today}-${randomHex}`;
};

module.exports = {
  calculateEndTime,
  getDayName,
  getTodayDateString,
  isDateInPast,
  generateBookingCode,
};
