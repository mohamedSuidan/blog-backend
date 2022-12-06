let postModel = require("../model/Post.Model");
exports.addPost = async (req, res, next) => {
  let newPost = new postModel();
  newPost.title = req.body.title;
  newPost.category = req.body.category;
  newPost.detales = req.body.text;
  newPost.autherId = req.body.autherId;
  newPost.autherName = req.body.autherName;
  newPost.img = req.file.path;
  newPost.likes = [];
  try {
    await newPost.save();
    res.send("data added");
  } catch (err) {
    console.log(err);
  }
};
exports.getAllPosts = async (req, res, next) => {
  let { page = 1, limit = 3 } = req.query;
  let data = await postModel
    .find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  let len = (await postModel.find()).length;
  res.json({
    posts: data,
    len: Math.ceil(len / 3),
  });
};
exports.addLike = async (req, res, next) => {
  let post = await postModel.findById(req.body.postId);
  if (post.likes.length !== 0) {
    post.likes.forEach(async (ele) => {
      if (ele.userId === req.body.userId) {
        await postModel.findByIdAndUpdate(req.body.postId, {
          $pull: { likes: { userId: req.body.userId, name: req.body.name } },
        });
      } else {
        await postModel.findByIdAndUpdate(req.body.postId, {
          $push: { likes: { userId: req.body.userId, name: req.body.name } },
        });
      }
    });
  } else {
    await postModel.findByIdAndUpdate(req.body.postId, {
      $push: { likes: { userId: req.body.userId, name: req.body.name } },
    });
  }
};
exports.getPostById = async (req, res, next) => {
  let post = await postModel.findById(req.params.id);
  res.json({
    post: post,
  });
};
