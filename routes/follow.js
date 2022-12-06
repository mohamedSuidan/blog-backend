let route = require("express").Router();
const bodyParser = require("body-parser");
const gurd = require("./protectes/gurd");
const followController = require("../controller/follow.controller");
route.post(
  "/add-follow",
  gurd.gurdAddPost,
  bodyParser.json(),
  followController.addFollow
);
module.exports = route;
