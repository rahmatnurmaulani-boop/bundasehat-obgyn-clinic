const Joi = require("joi");

const createScheduleSchema = Joi.object({
  service_id: Joi.number().integer().positive().required(),
  day_of_week: Joi.string()
    .valid(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    )
    .required(),
  start_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .required()
    .messages({
      "string.pattern.base": "Format start_time harus HH:mm atau HH:mm:ss",
    }),
  end_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .required()
    .messages({
      "string.pattern.base": "Format end_time harus HH:mm atau HH:mm:ss",
    }),
  slot_capacity: Joi.number().integer().min(1).default(1),
  is_active: Joi.boolean().default(true),
});

module.exports = {
  createScheduleSchema,
};
