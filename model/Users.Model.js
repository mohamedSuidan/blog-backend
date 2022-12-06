const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: String,
  gander: String,
  followers: Array,
  following: Array,
});

let user = mongoose.model("user", userSchema);

module.exports = user;
