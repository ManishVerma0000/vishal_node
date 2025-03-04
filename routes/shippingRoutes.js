const express = require('express');
const { addShippingAddress, getShippingAddress, updateShippingAddress } = require("../controllers/shippingController");


const router = express.Router();

router.post('/' , addShippingAddress);
router.get('/', getShippingAddress);
router.put('/', updateShippingAddress);

module.exports = router;
