var express = require("express");
var router = express.Router();
const getDateString = require("../toolfunctions/tools");
const Post = require("../models/Post");
const validateToken = require("../auth/validateToken.js");

router.get("/", function (req, res, next) {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    if (posts) res.json(posts);
    else res.status(404).send("Not found");
  });
});

router.get("/:id", function (req, res, next) {
  Post.findById(req.params.id, (err, post) => {
    if (err) throw err;
    if (post) res.json(post);
    else res.status(404).send("Not found");
  });
});

router.get("/:searchterm", function (req, res, next) {
  Post.find({ content: { $regex: req.params.searchterm } }, (err, posts) => {
    if (err) throw err;
    if (posts) res.json(posts);
    else res.status(404).send("Not found");
  });
});

router.post("/", validateToken, function (req, res, next) {
  let newPost = new Post({
    user: req.user.email,
    content: req.body.content,
    topic: req.body.topic,
    likes: 0,
    timestamp: getDateString.getDateString(),
    comments: [],
  });
  Post.addPost(newPost, (err, post) => {
    if (err) {
      res.json({ success: false, msg: "Failed to add post" });
    } else {
      res.json({ success: true, msg: "Post added" });
    }
  });
});

router.post("/like/:id/", validateToken, function (req, res, next) {
  Post.findById(req.params.id, (err, post) => {
    if (err) throw err;
    if (post) {
      Post.updateOne;
    } else res.status(404).send("Not found");
  });
});

router.post("/comment/:id", validateToken, function (req, res, next) {
  console.log(req.body.content);
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      // prettier-ignore
      $push: {
        comments: {
          user: req.user.email,
          content: req.body.content,
          timestamp: getDateString.getDateString(),
        },
      },
    },
    (err, post) => {
      if (err) {
        res.json({ success: false, msg: err.message });
      } else {
        res.json({ success: true, msg: "Comment added" });
      }
    }
  );
});
module.exports = router;
