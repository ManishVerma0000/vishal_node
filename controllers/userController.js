const User = require("../models/User");
const Order = require("../models/Order");

// Get user profile along with order history
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orders = await Order.find({ user: req.user.id });

        res.json({ user, orderHistory: orders });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Ensure correct export
module.exports = { getUserProfile };
