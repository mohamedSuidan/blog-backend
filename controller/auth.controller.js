let userModel = require("../model/Users.Model");
let bycrpt = require("bcrypt");
let jwt = require("jsonwebtoken");
let JWT_SECRET = "KL;FJSLJF dsalj daOH h gjgu fuf ufuafsg_SAd0";
exports.signup = async (req, res, next) => {
  try {
    let data = await userModel.findOne({ email: req.body.email });
    if (!data) {
      let hashPass = await bycrpt.hash(req.body.password, 10);
      let newUser = new userModel();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = hashPass;
      !req.file
        ? req.body.gander === "male"
          ? (newUser.img =
              "https://st2.depositphotos.com/2703645/7304/v/600/depositphotos_73040253-stock-illustration-male-avatar-icon.jpg")
          : (newUser.img =
              "https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_640.png")
        : (newUser.img = req.file.path);
      newUser.gander = req.body.gander;
      newUser.followers = [];
      newUser.following = [];
      try {
        await newUser.save();
        res.send("data added");
      } catch (err) {
        console.log(err);
      }
    } else {
      res.send("Email Founded");
    }
  } catch (err) {
    console.log(err);
  }
};
exports.signin = async (req, res, next) => {
  try {
    let data = await userModel.findOne({ email: req.body.email });
    if (data) {
      let compare = await bycrpt.compare(req.body.password, data.password);
      if (compare) {
        let token = jwt.sign(
          {
            id: data._id,
            name: data.name,
            email: data.email,
          },
          JWT_SECRET
        );
        res.json({
          token: token,
          id: data._id,
          name: data.name,
          email: data.email,
        });
      } else {
        res.send("You Have Mistake In Password");
      }
    } else {
      res.send("You Don't Have Any Acount");
    }
  } catch (err) {}
};
