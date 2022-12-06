const mongoose = require("mongoose");
let postSchema = mongoose.Schema({
  title: String,
  category: String,
  detales: String,
  autherId: String,
  autherName: String,
  img: String,
  likes: Array,
});

let post = mongoose.model("post", postSchema);

module.exports = post;
