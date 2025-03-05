const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authentication Middleware
async function authenticateUser(req, res, next) {
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    token = token.split(" ")[1]; // Extract token

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB (excluding password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(403).json({ success: false, message: "User no longer exists" });
    }

    req.user = user; // Attach user to request
    console.log("Authenticated User:", req.user._id);

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token, authentication failed" });
  }
}

// Admin Authorization Middleware
function authorizeAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed
  } else {
    return res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }
}

module.exports = { authenticateUser, authorizeAdmin };
