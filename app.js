const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require('moment');
// Auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// GET Request

app.get("/", (req, res) => {
  console.log("----------------------------");
  // find all data
  User.find()
    .then((result) => {
      console.log(result);
      res.render("index", { arr: result , moment: moment});
    })
    .catch((err) => {
      console.log(err);
    });

  // result ==> array of objects
});



app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

app.get("/user/:id", (req, res) => {
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

app.post("/user/add.html", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// connection
mongoose
  .connect(
    "mongodb+srv://mahdibkt:iHnuyDXJl6AOMyAK@cluster0.myqej.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
