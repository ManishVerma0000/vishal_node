const express = require("express");
const { getUserProfile } = require("../controllers/userController"); // Ensure correct import
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is logged in


const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile); // Correct callback

module.exports = router;
