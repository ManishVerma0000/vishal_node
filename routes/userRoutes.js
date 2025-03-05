const express = require("express");
const { getUserProfile } = require("../controllers/userController"); // Ensure correct import
const { authenticateUser } = require("../middleware/authmiddleware");


const router = express.Router();

router.get("/profile",authenticateUser, getUserProfile); // Correct callback

module.exports = router;
