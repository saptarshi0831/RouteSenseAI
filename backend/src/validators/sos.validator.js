const Joi = require("joi");

const createEmergencySchema = Joi.object({
  latitude: Joi.number().required(),

  longitude: Joi.number().required(),

  message: Joi.string().allow("").optional(),
});

module.exports = {
  createEmergencySchema,
};