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
      if (err) throw err;
      if (!user) {
        return res.json({ msg: "Invalid credentials" });
      } else {
        //Use the models function to compare passwords
        User.comparePassword(
          req.body.password,
          user.password,
          (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const jwtPayload = {
                id: user._id,
                email: user.email,
              };
              //Sign token using the created payload and secret, expire time 8 hours
              const jwtToken = jwt.sign(jwtPayload, `${process.env.SECRET}`, {
                expiresIn: 28800,
              });
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
  body("password")
    //password is checked to contain a capital and non-capital letter, a number, a special character and to be at least 8 characters long. This is done with regex
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`'!@#$%^&*()-_+={}[\]|;:"<>,.\/?])[A-Za-z\d~`'!@#$%^&*()-_+={}[\]|;:"<>,.\/?]{8,}$/
    ),

  (req, res, next) => {
    //Template for the new user
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
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

module.exports = router;
