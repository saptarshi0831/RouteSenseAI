const { z, email } = require("zod");

// Signup Schema
const signupSchema = z.object({
    name:     z.string().trim().min(3, "Name must be atleast 3 characters"),
    email:    z.string().trim().email(),
    password: z
                .string()
                .min(6, "Password must be at least 6 characters")
                .regex(/[A-Z]/, "Must contain at least one uppercase letter")
                .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

// Login Schema
const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(6),
});

module.exports = {
    signupSchema,
    loginSchema
}