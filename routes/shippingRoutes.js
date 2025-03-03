const express = require('express');
const { addShippingAddress, getShippingAddress, updateShippingAddress } = require("../controllers/shippingController");

const authMiddleware = require("../middleware/authMiddleware"); ;

const router = express.Router();

router.post('/', authMiddleware, addShippingAddress);
router.get('/', authMiddleware, getShippingAddress);
router.put('/', authMiddleware, updateShippingAddress);

module.exports = router;
