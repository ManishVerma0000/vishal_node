const express = require("express");
const { trackOrder } = require("../controllers/orderController");
// const authMiddleware = require("../middleware/authMiddleware.js"); // Ensure user is logged in


const router = express.Router();

router.get("/track/:orderId", trackOrder); // ✅ Track order

module.exports = router;
