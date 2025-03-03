const express = require("express");
const { postSubscribe } = require("../controllers/subscribeController");

const router = express.Router();

router.post("/", postSubscribe);

module.exports = router;
