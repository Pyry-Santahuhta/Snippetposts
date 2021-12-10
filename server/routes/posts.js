var express = require("express");
var router = express.Router();
const getDateString = require("../toolfunctions/tools");
const Post = require("../models/Post");
const User = require("../models/User");
const validateToken = require("../auth/validateToken.js");

router.get("/", function (req, res, next) {
  Post.find({}, (err, posts) => {
    if (posts) res.json(posts);
    else res.status(404).send("Not found");
  });
});

router.get("/:id", function (req, res, next) {
  Post.findById(req.params.id, (err, post) => {
    if (post) res.json(post);
    else res.status(404).send("Not found");
  });
});

router.get("/:searchterm", function (req, res, next) {
  Post.find({ code: { $regex: req.params.searchterm } }, (err, posts) => {
    if (posts) res.json(posts);
    else res.status(404).send("Not found");
  });
});

router.post("/", validateToken, function (req, res, next) {
  let newPost = new Post({
    user: req.user.email,
    code: req.body.code,
    description: req.body.description,
    title: req.body.title,
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

//Update vote count for a post.
router.patch("/vote/:id/", validateToken, function (req, res, next) {
  const newVote = req.body.vote;

  //Look if the post exists that the user is trying to vote.
  Post.findById(req.params.id, (err, post) => {
    if (!post) {
      res.json({ Success: false, msg: "Post doesn't exist" });
    } else {
      //If post exists, find the user voting.
      User.findOne({ email: req.user.email }, (err, user) => {
        //Check if the user has voted on this before.
        const foundVote = user.votes.find(
          (element) => element.post.toString(),
          req.params.id
        );

        //If the user has voted before...
        if (foundVote) {
          if (foundVote.vote === 1 && newVote === 0) {
            post.likes -= 1;
            user.votes = user.votes.filter(function (element) {
              if (element.post.toString() !== req.params.id) {
                return element;
              }
            });
            user.save();
            post.save();
          } else if (foundVote.vote === -1 && newVote === 0) {
            post.likes += 1;
            user.votes = user.votes.filter(function (element) {
              if (element.post.toString() !== req.params.id) {
                return element;
              }
            });
            user.save();
            post.save();
          }
          if (
            //Check if the vote is a new type of vote, meaning that if the old value was -1 the new value needs to be 1 or vice versa.
            (foundVote.vote === 1 && newVote !== -1) ||
            (foundVote.vote === -1 && newVote !== 1)
          ) {
            res.json({ Success: false, msg: "User already voted on this" });
          } else {
            //The new vote is different from the user's first one, so change the vote to be the new one.
            //Also increment or decrement the value from the post's likes and save.
            foundVote.vote = newVote;
            post.likes += newVote;
            user.save();
            post.save();
            res.json({ Success: true, msg: "Vote updated" });
          }
        } else {
          //The user hasn't voted for this before, so push the vote to the user's voted posts array
          //Also increment or decrement the value from the post's likes and save.
          user.votes.push({ post: req.params.id, vote: newVote });
          post.likes += newVote;
          user.save();
          post.save();
          res.json({ Success: true, msg: "Vote updated" });
        }
      });
    }
  });

  Post.findById(req.params.id, (err, post) => {
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
