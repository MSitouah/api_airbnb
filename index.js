const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user.js");

// require('dotenv').config()

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(
  "mongodb+srv://isitouah0:test123@cluster0.8d6lcbu.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const userDoc = User.create({
    name,
    email,
    password,
  });
  res.json(userDoc);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    res.json("found");
  } else {
    res.json("not");
  }
});

app.listen(4000, () => console.log("server started on http://localhost:4000"));
