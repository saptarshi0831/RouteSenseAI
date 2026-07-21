const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.findByEmail(decoded.email);
    if (!user || (user.role !== "admin" && user.email !== "admin@routesense.ai")) {
      return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = adminAuth;
