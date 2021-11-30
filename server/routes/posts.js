var express = require("express");
var router = express.Router();

const Post = require("../models/Post");
const validateToken = require("../auth/validateToken.js");

router.get("/", validateToken, function (req, res, next) {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    if (posts) res.json(posts);
    else res.status(404).send("Not found");
  });
});

router.post("/", validateToken, function (req, res, next) {
  let newPost = new Post({
    user: req.user.email,
    content: req.body.content,
    likes: 0,
    comments: null,
  });
  Post.addPost(newPost, (err, post) => {
    if (err) {
      res.json({ success: false, msg: "Failed to add post" });
    } else {
      res.json({ success: true, msg: "Post added" });
    }
  });
});

module.exports = router;
