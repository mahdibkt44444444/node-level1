const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mydataSchema");
app.set("view engine", "ejs");
app.use(express.static('public'))

// Auto refresh
 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});



app.get("/", (req, res) => {
  // result ==> array of objects

  Mydata.find()
    .then((result) => {
      res.render("home", { mytitle: "Home page", arr: result });
      
    })
    .catch((err) => {
      console.log(err);
    });

});

app.get("/index.html", (req, res) => {
  res.send("<h1>SUCCESS</h1>");
});

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
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/", (req, res) => {
  console.log(req.body);

  const mydata = new Mydata(req.body);

  mydata
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
