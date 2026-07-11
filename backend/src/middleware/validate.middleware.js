// It checks whether incoming request data matches the schema rules before it reaches controller
// Validate incoming request body using Zod

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const value = schema.parse(req.body);

      req.body = value;

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.errors
          .map((e) => e.message)
          .join(", "),
      });
    }
  };
};

module.exports = validate;