const { z } = require("zod");

const createShareSchema = z.object({
  durationHours: z
    .number()
    .min(1)
    .max(24)
    .optional(),
});

module.exports = {
  createShareSchema,
};