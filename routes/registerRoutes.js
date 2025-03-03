const express = require("express")
const { postRegister } = require("../controllers/registerController");

const router = express.Router();

router.post("/", postRegister);

module.exports= router