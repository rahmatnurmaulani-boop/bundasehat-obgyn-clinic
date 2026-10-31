// Format angka ke format Rupiah
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

// Format tanggal ISO ke format Indonesia (contoh: 12 Oktober 2026)
export const formatDateIndo = (dateString) => {
  if (!dateString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

// Format jam (contoh: 10:00:00 -> 10:00 WIB)
export const formatTime = (timeString) => {
  if (!timeString) return "-";
  return `${timeString.slice(0, 5)} WIB`;
};
