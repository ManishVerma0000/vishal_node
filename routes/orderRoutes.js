const express = require("express");
const { 
    trackOrder, 
    getUserOrders, 
    getDeliveredOrders, 
    getAllOrders 
} = require("../controllers/orderController");
const { authenticateUser } = require("../middleware/authmiddleware");


const router = express.Router();

// ✅ Track Order (User & Admin)
router.get("/:orderId", authenticateUser, trackOrder);

// ✅ Get All Orders for User
router.get("/user/all", authenticateUser, getUserOrders);

// ✅ Get Delivered Orders for User
router.get("/user/delivered", authenticateUser, getDeliveredOrders);

// ✅ Get All Orders (Admin Only)
router.get("/admin/all", authenticateUser, getAllOrders);

module.exports = router;
