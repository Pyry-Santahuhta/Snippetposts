const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "../.env" });
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const mongoose = require("mongoose");

//Connect to mongo database
const mongoDB = "mongodb://localhost:27017/projectdb";
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

//Define app with express.
const app = express();

//Middleware to recognize requests objects as JSON or strings and arrays.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use the routers with the users and posts api's
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

//If in production, serve the build folder
if (process.env.NODE_ENV === "production") {
  console.log("Starting on production");
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build"))
  );
  //Else if in development, accept all cors and just run the back end
} else if (process.env.NODE_ENV === "development") {
  console.log("Starting on development");
  const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}
module.exports = app;
