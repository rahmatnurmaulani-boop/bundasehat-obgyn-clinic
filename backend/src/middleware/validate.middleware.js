const { errorResponse } = require("../utils/response.util");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));

      return errorResponse(res, "Validasi input gagal", errorDetails, 400);
    }

    next();
  };
};

module.exports = validate;
