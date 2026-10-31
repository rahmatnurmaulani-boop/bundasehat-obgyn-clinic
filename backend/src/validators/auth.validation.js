const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Nama harus berupa teks",
    "string.empty": "Nama tidak boleh kosong",
    "string.min": "Nama minimal 3 karakter",
    "any.required": "Nama wajib diisi",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Format email tidak valid",
    "any.required": "Email wajib diisi",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password minimal 6 karakter",
    "any.required": "Password wajib diisi",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .optional()
    .messages({
      "string.pattern.base": "Nomor telepon hanya boleh berisi angka",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Format email tidak valid",
    "any.required": "Email wajib diisi",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password wajib diisi",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
