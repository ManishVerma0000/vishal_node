const Order = require("../models/Order");

// ✅ Track Order (User & Admin)
exports.trackOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id; 
        const userRole = req.user.role; 

        let order;
        if (userRole === "admin") {
            // ✅ Admins can track any order
            order = await Order.findOne({ _id: orderId }).populate("items.productId", "name price");
        } else {
            // ✅ Users can only track their own orders
            order = await Order.findOne({ _id: orderId, userId }).populate("items.productId", "name price");
        }

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status fetched successfully",
            orderStatus: order.status,
            orderDetails: order
        });
    } catch (error) {
        console.error("Track Order Error:", error);
        res.status(500).json({ message: "Failed to track order", error: error.message });
    }
};

// ✅ Get All Orders (User)
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; 
        const orders = await Order.find({ userId }).populate("items.productId", "name price");

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({ message: "User orders fetched successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};

// ✅ Get Previous Orders (Delivered Only)
exports.getDeliveredOrders = async (req, res) => {
    try {
        const userId = req.user.id; 
        const deliveredOrders = await Order.find({ userId, status: "Delivered" }).populate("items.productId", "name price");

        if (!deliveredOrders.length) {
            return res.status(404).json({ message: "No delivered orders found" });
        }

        res.status(200).json({ message: "Delivered orders fetched successfully", deliveredOrders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch delivered orders", error: error.message });
    }
};

// ✅ Get All Orders (Admin Only)
exports.getAllOrders = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const orders = await Order.find().populate("items.productId", "name price");
        res.status(200).json({ message: "All orders fetched successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};
