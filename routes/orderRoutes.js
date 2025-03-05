const express = require("express");
const { trackOrder } = require("../controllers/orderController");
const { authenticateUser } = require("../middleware/authmiddleware");


const router = express.Router();

router.get("/track/:orderId",authenticateUser, trackOrder); // ✅ Track order

module.exports = router;
