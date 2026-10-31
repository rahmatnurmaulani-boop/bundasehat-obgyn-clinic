const Joi = require("joi");

const createBookingSchema = Joi.object({
  service_id: Joi.number().integer().positive().required().messages({
    "any.required": "Layanan (service_id) wajib dipilih",
  }),
  booking_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Format booking_date harus YYYY-MM-DD",
      "any.required": "Tanggal booking wajib diisi",
    }),
  start_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .required()
    .messages({
      "string.pattern.base": "Format start_time harus HH:mm atau HH:mm:ss",
      "any.required": "Jam mulai wajib diisi",
    }),
  notes: Joi.string().allow("", null).optional(),
});

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("PENDING", "CONFIRMED", "COMPLETED", "CANCELLED")
    .required()
    .messages({
      "any.only":
        "Status hanya boleh PENDING, CONFIRMED, COMPLETED, atau CANCELLED",
      "any.required": "Status wajib disertakan",
    }),
});

module.exports = {
  createBookingSchema,
  updateStatusSchema,
};
