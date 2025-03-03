const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add a product to the wishlist
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }

        res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter(
            (item) => item.toString() !== productId
        );
        await wishlist.save();

        res.status(200).json({ message: "Product removed from wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get user's wishlist
const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist is empty" });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
