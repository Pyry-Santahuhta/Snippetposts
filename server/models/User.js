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

//Save a new user in the database and send a callback with the status to the calling function.
//Salt and hash the user's password with bcrypt's genSalt and hash functions.
module.exports.addUser = function (newUser, callback) {
  //Salting using a 10 Round salt
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) next(err);
      //Save the hash from the callback to the database as the user's password.
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

//Compare password with a candidate using the hash from the database, used for login.
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) next(err);
    callback(null, isMatch);
  });
};
