const express = require('express');
const { addShippingAddress, getShippingAddress, updateShippingAddress } = require("../controllers/shippingController");
const { authenticateUser } = require("../middleware/authmiddleware");


const router = express.Router();

router.post('/' ,authenticateUser, addShippingAddress);
router.get('/',authenticateUser, getShippingAddress);
router.put('/',authenticateUser, updateShippingAddress);

module.exports = router;
