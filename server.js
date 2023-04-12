const express = require("express");
// require('dotenv').config();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(__dirname+'/public'));
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://abhishek:UyClZtu0tcMMENkE@atlascluster.thlvtaa.mongodb.net/?retryWrites=true&w=majority"
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const createuser = async () => {
    try {
      const newuser = new user({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      });

      const result = await newuser.save();
    } catch (err) {
      console.log(err);
    }
  };

  createuser();
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(4000, function () {
  console.log("Server started at Port 4000");
});

const user = new mongoose.model("User", userSchema);