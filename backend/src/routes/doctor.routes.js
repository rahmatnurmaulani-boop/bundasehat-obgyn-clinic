const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const verifyToken = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/role.middleware");

// Public: Siapa pun (pasien/tamu) bisa melihat daftar dokter
router.get("/", (req, res, next) => doctorController.getAll(req, res, next));
router.get("/:id", (req, res, next) =>
  doctorController.getById(req, res, next),
);

// Admin Only: Hanya admin yang bisa mengelola data dokter
router.post("/", verifyToken, authorizeRole("admin"), (req, res, next) =>
  doctorController.create(req, res, next),
);
router.put("/:id", verifyToken, authorizeRole("admin"), (req, res, next) =>
  doctorController.update(req, res, next),
);
router.delete("/:id", verifyToken, authorizeRole("admin"), (req, res, next) =>
  doctorController.delete(req, res, next),
);

module.exports = router;
