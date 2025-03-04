const express = require("express");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlistController");
// const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is logged in


const router = express.Router();

router.post("/add" , addToWishlist); // Add to wishlist
router.delete("/remove/:productId", removeFromWishlist); // Remove from wishlist
router.get("/", getWishlist); // Get wishlist

module.exports = router;
