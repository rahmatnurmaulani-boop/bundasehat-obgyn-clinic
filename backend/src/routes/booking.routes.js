const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const verifyToken = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createBookingSchema,
  updateStatusSchema,
} = require("../validators/booking.validation");

// Semua route booking memerlukan otentikasi login
router.use(verifyToken);

// ⚡ 1. ROUTE LIVE STREAM HARUS DITARUH DI ATAS SEBELUM /:id
router.get("/live-stream", authorizeRole("admin"), (req, res) =>
  bookingController.liveStream(req, res),
);

// 2. Customer membuat booking
router.post(
  "/",
  authorizeRole("customer"),
  validate(createBookingSchema),
  (req, res, next) => bookingController.create(req, res, next),
);

// 3. Melihat daftar booking (Customer: miliknya; Admin: semua)
router.get("/", (req, res, next) => bookingController.getAll(req, res, next));

// 4. Pembatalan booking (Customer pemilik / Admin)
router.patch("/:id/cancel", (req, res, next) =>
  bookingController.cancel(req, res, next),
);

// 5. Admin update status booking (CONFIRMED / COMPLETED)
router.patch(
  "/:id/status",
  authorizeRole("admin"),
  validate(updateStatusSchema),
  (req, res, next) => bookingController.updateStatus(req, res, next),
);

// 6. Detail booking berdasarkan ID (DITARUH PALING BAWAH AGAR TIDAK MENABRAK ROUTE LAIN)
router.get("/:id", (req, res, next) =>
  bookingController.getById(req, res, next),
);

module.exports = router;
