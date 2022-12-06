let route = require("express").Router();
const bodyParser = require("body-parser");
const multer = require("multer");
let authController = require("../controller/auth.controller");
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
  "/signup",
  bodyParser.json(),
  upload.single("img"),
  authController.signup
);
route.post("/signin", bodyParser.json(), authController.signin);
module.exports = route;
