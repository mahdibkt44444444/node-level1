const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
const userConstroller = require("../controllers/userController");

var moment = require("moment");



router.get("/add.html", userConstroller.user_add_get);
router.post("/add.html", userConstroller.user_add_post);

module.exports = router;
