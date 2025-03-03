const User = require("../models/User");
const Order = require("../models/Order");

// Get all users with their order history (Admin only)
const getAllUsersWithOrders = async (req, res) => {
    try {
        // Ensure the user is an admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Fetch all users
        const users = await User.find().select("-password"); // Exclude password

        // Fetch order history for each user
        const usersWithOrders = await Promise.all(
            users.map(async (user) => {
                const orders = await Order.find({ user: user._id });
                return { ...user._doc, orderHistory: orders };
            })
        );

        res.json(usersWithOrders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Ensure correct export
module.exports = { getAllUsersWithOrders };
