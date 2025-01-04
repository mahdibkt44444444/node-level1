const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
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
