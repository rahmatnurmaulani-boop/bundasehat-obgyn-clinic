const { eventBus, EVENTS } = require("../utils/eventBus.util");

function initBookingListeners() {
  // Listener saat ada pesanan baru masuk
  eventBus.on(EVENTS.BOOKING_CREATED, (bookingData) => {
    console.log(`\n Pesanan Baru Masuk!`);
    console.log(`- Kode Booking: ${bookingData.booking_code}`);
    console.log(
      `- Customer: ${bookingData.customer_name || "User ID: " + bookingData.user_id}`,
    );
    console.log(
      `- Total: Rp ${Number(bookingData.total_price).toLocaleString("id-ID")}`,
    );
    console.log(
      `- Tanggal/Jam: ${bookingData.booking_date} | ${bookingData.start_time}\n`,
    );
  });

  // Listener saat status pesanan berubah
  eventBus.on(EVENTS.BOOKING_STATUS_UPDATED, ({ bookingId, status }) => {
    console.log(
      `\n Status Booking #${bookingId} diperbarui menjadi: [${status}]\n`,
    );
  });

  // Listener saat pesanan dibatalkan
  eventBus.on(EVENTS.BOOKING_CANCELLED, ({ bookingId }) => {
    console.log(`\n Booking #${bookingId} telah DIBATALKAN oleh pengguna.\n`);
  });

  console.log("Booking Event Listeners aktif.");
}

module.exports = initBookingListeners;
