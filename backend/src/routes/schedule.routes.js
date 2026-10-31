const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");
const verifyToken = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { createScheduleSchema } = require("../validators/schedule.validation");

// Public/Customer & Admin can view schedules
router.get("/", (req, res, next) =>
  scheduleController.getByService(req, res, next),
);

// Admin only can manage schedules
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  validate(createScheduleSchema),
  (req, res, next) => scheduleController.create(req, res, next),
);
router.delete("/:id", verifyToken, authorizeRole("admin"), (req, res, next) =>
  scheduleController.delete(req, res, next),
);

module.exports = router;
