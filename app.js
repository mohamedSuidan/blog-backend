const express = require("express");
const app = express();
let mongoose = require("mongoose");
let auth = require("./routes/auth");
let post = require("./routes/post");
let profile = require("./routes/profile");
let follow = require("./routes/follow");
let cors = require("cors");
let connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ahmed:FR0thHT8kNiI77CT@blog.xyqghfa.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(4000, () => console.log("server listen"));
  } catch (err) {
    console.log(err);
  }
};
connect();
app.use(cors());
app.use(auth);
app.use(post);
app.use(profile);
app.use(follow);
app.use("/public", express.static("public"));
