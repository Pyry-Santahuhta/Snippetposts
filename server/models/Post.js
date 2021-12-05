const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    topic: { type: String, required: true },
    user: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number },
    timestamp: { type: String, required: true },
    comments: [{ user: String, content: String, timestamp: String }],
  },
  { collection: "posts" }
);

module.exports = mongoose.model("posts", postSchema);

module.exports.addPost = function (newPost, callback) {
  newPost.save(callback);
};
