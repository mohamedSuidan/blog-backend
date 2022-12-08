let postModel = require("../model/Post.Model");
let userModel = require("../model/Users.Model");
exports.getProfile = async (req, res, next) => {
  let { page = 1, limit = 3 } = req.query;

  let user = await userModel.findById(req.params.id);
  let posts = await postModel.find({ autherId: req.params.id }).limit(2);

  res.json({
    user: user,
    posts: posts,
  });
};
