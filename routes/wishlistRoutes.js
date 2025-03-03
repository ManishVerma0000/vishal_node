const express = require("express");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlistController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is logged in


const router = express.Router();

router.post("/add", authMiddleware, addToWishlist); // Add to wishlist
router.delete("/remove/:productId", authMiddleware, removeFromWishlist); // Remove from wishlist
router.get("/", authMiddleware, getWishlist); // Get wishlist

module.exports = router;
