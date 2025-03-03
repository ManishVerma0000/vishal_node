const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB to ensure they still exist
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(403).json({ message: "User no longer exists" });
    }

    req.user = user; // Attach user to request object

    console.log("Authenticated User:", req.user);

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid token, authentication failed" });
  }
}

module.exports = authMiddleware;
