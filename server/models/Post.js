const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

//Mongoose schema for a post
let postSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    likes: { type: Number, required: true },
    timestamp: { type: String, required: true },
    comments: [{ user: String, content: String, timestamp: String }],
  },
  { collection: "posts" }
);

module.exports = mongoose.model("posts", postSchema);

//Save a new post in the database and send a callback with the status to the calling function.
module.exports.addPost = function (newPost, callback) {
  newPost.save(callback);
};
