const Order = require("../models/Order");

exports.trackOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id; // Get user ID from authenticated request

        // Find the order
        const order = await Order.findOne({ _id: orderId, userId }).populate("items.productId", "name price");

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
