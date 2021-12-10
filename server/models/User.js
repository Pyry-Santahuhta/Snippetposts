const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    votes: [{ vote: Number, post: Schema.Types.ObjectId }],
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", userSchema);

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
