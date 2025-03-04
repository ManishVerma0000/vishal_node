const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
// const authMiddleware = require("../middleware/authMiddleware.js"); // Ensure user is logged in

router.post("/add",  cartController.addToCart);
router.get("/",  cartController.getCart);
router.delete("/remove",  cartController.removeFromCart);




module.exports = router;
