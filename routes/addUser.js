const express = require('express')
const router = express.Router()
const User = require("../models/customerSchema");

var moment = require('moment');


router.get("/user/add.html", (req, res) => {
    res.render("user/add");
  });
  

router.get("/add.html", (req, res) => {
    res.render("user/add");
  });
  router.post("/add.html", (req, res) => {
    User
      .create(req.body)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  
  module.exports = router