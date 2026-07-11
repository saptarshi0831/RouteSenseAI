const { verifyToken } = require("../utils/jwt");

// extract token
const authMiddleware = (
    req,
    res,
    next
) => {
    // read header
    const authHeader = req.headers.authorization;

    // validate
    if (
        !authHeader ||
        !authHeader.startsWith(
            "Bearer "
        )
    ) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    // get token
    const token = 
        authHeader.split(" ")[1];

    // verify
    try {
        const decoded = verifyToken(token);

        req.user = decoded;
        next();

    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};

module.exports = authMiddleware;

/*
Client request
   ↓
authMiddleware
   ↓
Check Authorization header
   ↓
Extract token
   ↓
Verify JWT
   ↓
Attach user to req
   ↓
next() → protected route runs
*/