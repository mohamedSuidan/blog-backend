let route = require("express").Router();
const bodyParser = require("body-parser");
const postController = require("../controller/post.controller");
const gurd = require("./protectes/gurd");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
route.post(
  "/add-post",
  gurd.gurdAddPost,
  bodyParser.json(),
  upload.single("img"),
  postController.addPost
);
route.get("/posts", postController.getAllPosts);
route.post(
  "/add-like",
  gurd.gurdAddPost,
  bodyParser.json(),
  postController.addLike
);
route.get("/post/:id", postController.getPostById);
module.exports = route;
