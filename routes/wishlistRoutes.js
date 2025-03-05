const express = require("express");
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlistController");
const { authenticateUser } = require("../middleware/authmiddleware");


const router = express.Router();

router.post("/add" , authenticateUser,addToWishlist); // Add to wishlist
router.delete("/remove/:productId",authenticateUser, removeFromWishlist); // Remove from wishlist
router.get("/",authenticateUser, getWishlist); // Get wishlist

module.exports = router;
