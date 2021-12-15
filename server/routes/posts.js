var express = require("express");
var router = express.Router();
const getDateString = require("../toolfunctions/tools");
const Post = require("../models/Post");
const User = require("../models/User");
const validateToken = require("../auth/validateToken.js");

//Routes related to posts, all routes start with /posts/

//Get / responds with all of the posts in the database.
router.get("/", function (req, res, next) {
  //Mongoose find with no parameters returns the whole collection.
  Post.find({}, (err, posts) => {
    //Respond with the posts if they were found.
    if (posts) res.json(posts);
    //Respond with 404 if no posts were found.
    else res.status(404).send("Not found");
  });
});

//Get /:id responds with a post by id.
router.get("/:id", function (req, res, next) {
  //Mongoose findById with the url parameter id returns the desired post.
  Post.findById(req.params.id, (err, post) => {
    //Respond with the post if it was found.
    if (post) res.json(post);
    //Respond with 404 if no post was found.
    else res.status(404).send("Not found");
  });
});

//Get /search/:searchterm responds with posts matching a searchterm
router.get("/search/:searchterm", function (req, res, next) {
  //Create a new regular expression using i flag, for case insensitive search.
  let regex = new RegExp(req.params.searchterm, "i");

  //Find from posts all posts where the title, description or code matches the search term.
  Post.find(
    {
      //And matches all posts so not only the first one is returned.
      $and: [
        {
          //Or matches any of the following regex tests.
          $or: [
            {
              title: regex,
            },
            {
              description: regex,
            },
            {
              code: regex,
            },
          ],
        },
      ],
    },
    (err, posts) => {
      //Respond with the posts if some was found.
      if (posts) res.json(posts);
      //Respond with 404 if no post was found.
      else res.status(404).send("Not found");
    }
  );
});

//Post / saves a new post to the database. Validate token is used as middleware so only users with authenthication can post.
router.post("/", validateToken, function (req, res, next) {
  //Create a new post using the post schema and request data. Set likes and comments to none and get a timestamp using the getDateString method.
  let newPost = new Post({
    user: req.user.email,
    code: req.body.code,
    description: req.body.description,
    title: req.body.title,
    likes: 0,
    timestamp: getDateString.getDateString(),
    comments: [],
  });
  //Add the post using the model's addPost function respond with status accordingly.
  Post.addPost(newPost, (err, post) => {
    if (err) {
      res.json({ success: false, msg: "Failed to add post" });
    } else {
      res.json({ success: true, msg: "Post added" });
    }
  });
});

//Patch /vote/:id updates the vote count for a post. Validate token is used as middleware so only users with authenthication can vote.
router.patch("/vote/:id/", validateToken, function (req, res, next) {
  const newVote = req.body.vote;
  //Look if the post exists that the user is trying to vote for with mongoose findById.
  Post.findById(req.params.id, (err, post) => {
    if (!post) {
      res.json({ Success: false, msg: "Post doesn't exist" });
    } else {
      //If post exists, find the user voting from the User database.
      User.findOne({ email: req.user.email }, (err, user) => {
        //Check if the user has voted on this before.
        const foundVote = user.votes.find(
          (element) => element.post.toString() === req.params.id
        );
        //If the user has voted before:
        if (foundVote) {
          //If the previous was a like and new vote is a undo.
          if (foundVote.vote === 1 && newVote === 0) {
            //Remove 1 like from the post's likes.
            post.likes -= 1;
            //Filter the current vote out from the user's votes
            user.votes = user.votes.filter(function (element) {
              if (element.post.toString() !== req.params.id) {
                return element;
              }
            });
            //Save both databases.
            user.save();
            post.save();
            //If the  previous vote was a dislike and new vote is a undo
          } else if (foundVote.vote === -1 && newVote === 0) {
            //Add 1 like to the post's like
            post.likes += 1;
            //Filter the current vote out from the user's votes
            user.votes = user.votes.filter(function (element) {
              if (element.post.toString() !== req.params.id) {
                return element;
              }
            });
            //Save both databases.
            user.save();
            post.save();
          }
          if (
            //Check if the vote is a new type of vote, meaning that if the old value was -1 the new value needs to be 1 or vice versa.
            (foundVote.vote === 1 && newVote !== -1) ||
            (foundVote.vote === -1 && newVote !== 1)
          ) {
            //If the user has already voted the same for the vote, respond with success false.
            res.json({ Success: false, msg: "User already voted on this" });
          } else {
            //The new vote is different from the user's first one, so change the vote to be the new one.
            //Also increment or decrement the value from the post's likes and save.
            foundVote.vote = newVote;
            post.likes += newVote * 2;

            //Save both posts and respond with success.
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
          res.json({ Success: true, msg: "Vote added" });
        }
      });
    }
  });
});

//Post /comment/:id Adds a new comment to a post. Validate token is used as middleware so only users with authenthication can comment.
router.post("/comment/:id", validateToken, function (req, res, next) {
  //Find the post the user is trying to comment on using mongoose's findbyIdAndUpdate. Id is in the req.params.
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      // Push the new comment using mongoose $push. Get comment timestamp from getDateString().
      $push: {
        comments: {
          user: req.user.email,
          content: req.body.content,
          timestamp: getDateString.getDateString(),
        },
      },
    },
    (err, post) => {
      // Respond with status accordingly.
      if (err) {
        res.json({ success: false, msg: err.message });
      } else {
        res.json({ success: true, msg: "Comment added" });
      }
    }
  );
});
module.exports = router;
