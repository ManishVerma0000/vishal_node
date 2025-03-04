const express = require("express");
const { getAllUsersWithOrders } = require("../controllers/useradminController");
const authMiddleware = require("../middleware/authMiddleware.js"); // Ensure user is logged in


const router = express.Router();

// Route to get all users and their order history (Admin only)
router.get("/user", authMiddleware, getAllUsersWithOrders);

module.exports = router;
