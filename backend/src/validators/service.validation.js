const Joi = require("joi");

const createServiceSchema = Joi.object({
  name: Joi.string().min(3).max(150).required().messages({
    "string.empty": "Nama layanan tidak boleh kosong",
    "any.required": "Nama layanan wajib diisi",
  }),
  description: Joi.string().allow("", null).optional(),
  category: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Kategori layanan tidak boleh kosong",
    "any.required": "Kategori layanan wajib diisi",
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Harga layanan harus bernilai positif",
    "any.required": "Harga layanan wajib diisi",
  }),
  duration_minutes: Joi.number().integer().positive().default(60).messages({
    "number.positive": "Durasi layanan harus lebih dari 0 menit",
  }),
  is_active: Joi.boolean().default(true),
});

const updateServiceSchema = Joi.object({
  name: Joi.string().min(3).max(150).optional(),
  description: Joi.string().allow("", null).optional(),
  category: Joi.string().min(2).max(50).optional(),
  price: Joi.number().positive().optional(),
  duration_minutes: Joi.number().integer().positive().optional(),
  is_active: Joi.boolean().optional(),
}).min(1);

module.exports = {
  createServiceSchema,
  updateServiceSchema,
};
