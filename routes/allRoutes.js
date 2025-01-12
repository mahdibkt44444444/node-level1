const express = require('express')
const router = express.Router()
const User = require("../models/customerSchema");

var moment = require('moment');

// GET Request

router.get("/", (req, res) => {
  console.log("----------------------------");
  // find all data
  User.find()
    .then((result) => {
      res.render("index", { arr: result , moment: moment});
    })
    .catch((err) => {
      console.log(err);
    });

  // result ==> array of objects
});





router.get("/:id", (req, res) => {
   // result ==> object
   User.findById(req.params.id)
   .then((result) => {
     res.render("user/edit", {obj: result , moment: moment});
   })
   .catch((err) => {
     console.log(err);
   });
});



// view details 
router.get("/view/:id", (req, res) => {
  // result ==> object
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", {obj: result , moment: moment});
    })
    .catch((err) => {
      console.log(err);
    });
  
});



// POST Request



// search
// trim ==> remove white space
router.post("/search", (req, res) => {
  console.log("*****************************")
  const searchText = req.body.searchText.trim();
  console.log(req.body.searchText)

  User.find({ $or : [{firstName:searchText },{lastName:searchText}]} )
    .then((result) => {
      console.log(result)
      res.render("user/search", {arr: result , moment: moment});
    })
    .catch((err) => {
      console.log(err);
    });
});



// DELETE Request
router.delete("/:id", (req, res) => {
  console.log("doneeeeee")
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
      console.log("deleted");
    })
    .catch((err) => {
      console.log(err);
    });
  
}); 


// PUT Request

router.put("/:id", (req, res) => {
  console.log("***************")
  const id = req.params.id;
  const body = req.body;
  User.updateOne({_id: id},body)
  .then((result) => {
    console.log(result);
  res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
  
  
}); 


module.exports = router