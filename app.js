const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata=require("./models/mydataSchema")


app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

app.get("/index.html", (req, res) => {
    res.send("<h1>hellobbbb</h1>");
  });



mongoose
  .connect("mongodb+srv://mahdibkt:iHnuyDXJl6AOMyAK@cluster0.myqej.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
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

    mydata.save().then(() => {
        res.redirect("/index.html");
    }).catch((err) => {
      console.log(err);
    });

    
  });