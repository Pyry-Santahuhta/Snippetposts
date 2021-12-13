const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "../.env" });
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const mongoose = require("mongoose");

const mongoDB = "mongodb://localhost:27017/projectdb";
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

if (process.env.NODE_ENV === "production") {
  console.log("Starting on production");
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build"))
  );
} else if (process.env.NODE_ENV === "development") {
  console.log("Starting on development");
  const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}
module.exports = app;
