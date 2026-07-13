const { z } = require("zod");

const createEmergencySchema = z.object({
  latitude: z.number({ required_error: "Latitude is required" }),
  longitude: z.number({ required_error: "Longitude is required" }),
  message: z.string().optional(),
});

module.exports = {
  createEmergencySchema,
};