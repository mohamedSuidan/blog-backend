let route = require("express").Router();
const bodyParser = require("body-parser");
let profileController = require("../controller/profile.controller");
route.get("/profile/:id", profileController.getProfile);
module.exports = route;
