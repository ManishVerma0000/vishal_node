const express = require("express")
const {postLogin} = require("../controllers/authController")

const router = express.Router();

router.post("/", postLogin);

module.exports= router