const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
// const authMiddleware = require("../middleware/authMiddleware.js");
const { authenticateUser } = require("../middleware/authmiddleware");

router.post("/", authenticateUser, checkoutController.checkout);
router.post("/buy-now", authenticateUser, checkoutController.buyNow);

module.exports = router;
