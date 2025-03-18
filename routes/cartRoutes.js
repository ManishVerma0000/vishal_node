const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticateUser } = require("../middleware/authmiddleware");

router.post("/add", authenticateUser, cartController.addToCart);
router.get("/", authenticateUser, cartController.getCart);
router.delete("/remove", authenticateUser, cartController.removeFromCart);

module.exports = router;
