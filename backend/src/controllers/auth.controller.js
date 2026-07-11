const authService = require("../services/auth.service");

// Signup
const signup = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await authService.signup(
                req.body
            );

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            message: error.message,
            errors: error.errors || error.issues
        });
    }
};

// Login
const login = async (
    req,
    res,
    next
) => {

    // test
    console.log("LOGIN BODY:", req.body);

    try {
        const result =
            await authService.login(
                req.body
            );
        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    signup,
    login
}