const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const verifyToken = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createServiceSchema,
  updateServiceSchema,
} = require("../validators/service.validation");

// Public endpoints
router.get("/", (req, res, next) => serviceController.getAll(req, res, next));
router.get("/:id", (req, res, next) =>
  serviceController.getById(req, res, next),
);

// Admin only endpoints
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  validate(createServiceSchema),
  (req, res, next) => serviceController.create(req, res, next),
);
router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  validate(updateServiceSchema),
  (req, res, next) => serviceController.update(req, res, next),
);
router.delete("/:id", verifyToken, authorizeRole("admin"), (req, res, next) =>
  serviceController.delete(req, res, next),
);

module.exports = router;
