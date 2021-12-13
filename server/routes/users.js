const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Login post request
router.post(
  "/login",
  //Validate input using express validator and multer
  body("email").isEmail().normalizeEmail().escape(),
  body("password"),
  upload.none(),
  (req, res, next) => {
    //Check if user with this email exists
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(400);
      if (!user) {
        return res.json({ msg: "Invalid credentials" });
      } else {
        //Use the models function to compare passwords
        User.comparePassword(
          req.body.password,
          user.password,
          (err, isMatch) => {
            if (isMatch) {
              const jwtPayload = {
                id: user._id,
                email: user.email,
              };
              //Sign token using the created payload and secret
              const jwtToken = jwt.sign(jwtPayload, `${process.env.SECRET}`);
              res.json({
                success: true,
                token: jwtToken,
                user: {
                  id: user._id,
                  email: user.email,
                },
              });
            } else {
              return res.json({ success: false, msg: "Invalid credentials" });
            }
          }
        );
      }
    });
  }
);

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
    //Template for the new user
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
      votes: [],
    });

    //If validation is unsuccesful, errors are logged here
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), msg: "Password is not strong enough" });
    }

    //Look if an user with this email already exists.
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        throw err;
      }
      if (user) {
        return res.status(403).json({ msg: "Email already in use" });
      } else {
        //Create user and respond with success status
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

router.get("/:id", function (req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (user) res.json(user);
    else res.status(404).send("Not found");
  });
});

module.exports = router;
