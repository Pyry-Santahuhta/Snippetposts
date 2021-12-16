const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Routes related to users, all routes start with /users/

//Login post responds with user data if login was successfull.
router.post(
  "/login",
  //Validate input using express validator and multer
  body("email").isEmail().normalizeEmail().escape(),
  body("password"),
  upload.none(),
  (req, res, next) => {
    //Find user with this email using Mongoose find.
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(400);
      if (!user) {
        return res.json({ msg: "Invalid email" });
      } else {
        //Use the model's function to compare passwords
        User.comparePassword(
          req.body.password,
          user.password,
          (err, isMatch) => {
            //If the passwords match, initialize the jwtPayload that will be put into the token.
            //The user id and email can later be accessed from the token.
            if (isMatch) {
              const jwtPayload = {
                id: user._id,
                email: user.email,
              };
              //Sign token using the created payload and environment variable secret.
              const jwtToken = jwt.sign(jwtPayload, `${process.env.SECRET}`);
              //Respond with success and the token. Set also req.user.
              res.json({
                success: true,
                token: jwtToken,
                user: {
                  id: user._id,
                  email: user.email,
                },
              });
            } else {
              //Passwords didn't match.
              return res.json({ success: false, msg: "Invalid password" });
            }
          }
        );
      }
    });
  }
);

// /Register post creates a new user in the database if successfull.
router.post(
  "/register",
  //Validate input using express validator and multer
  upload.none(),
  body("email").isEmail().normalizeEmail().escape(),

  //password is checked to contain a capital and non-capital letter, a number and to be at least 8 characters long. This is done with regex
  body("password").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`'!@#$%^&*()-_+={}[\]|;:"<>,.\/?])[A-Za-z\d~`'!@#$%^&*()-_+={}[\]|;:"<>,.\/?]{8,}$/
  ),

  (req, res, next) => {
    //Create the new user using the schema.
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
      votes: [],
    });

    //If validation is unsuccesful, errors are logged here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Respond with errors if any arise.
      return res
        .status(400)
        .json({ errors: errors.array(), msg: "Password is not strong enough" });
    }

    //Look if an user with this email already exists.
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        next(err);
      }

      //No users with same email address are accepted, respond with 403.
      if (user) {
        return res.status(403).json({ msg: "Email already in use" });
      } else {
        //Create user using the model's addUser function and respond with success status.
        User.addUser(newUser, (err, user) => {
          if (err) {
            res.json({ success: false, msg: "User not created" });
          } else {
            res.json({ success: true });
          }
        });
      }
    });
  }
);

// get /:id responds with corresponding user.
router.get("/:id", function (req, res, next) {
  //Find user by params id.
  User.findById(req.params.id, (err, user) => {
    //If found, respond with user data.
    if (user) res.json(user);
    //No user, respond with 404 not found.
    else res.status(404).send("Not found");
  });
});

module.exports = router;
