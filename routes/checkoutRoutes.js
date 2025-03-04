const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
// const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/",  checkoutController.checkout);
router.post("/buy-now",  checkoutController.buyNow);

module.exports = router;
