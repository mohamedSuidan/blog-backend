const userModel = require("../model/Users.Model");
exports.addFollow = async (req, res, next) => {
  let userAddFollow = await userModel.findById(req.body.followAdded);
  let userTakeFollow = await userModel.findById(req.body.takeFollow);

  if (userAddFollow.following.length === 0) {
    await userModel.findByIdAndUpdate(req.body.followAdded, {
      $push: { following: req.body.takeFollow },
    });
  } else {
    userAddFollow.following.forEach(async (ele) => {
      if (ele === req.body.takeFollow) {
        await userModel.findByIdAndUpdate(req.body.followAdded, {
          $pull: { following: req.body.takeFollow },
        });
      } else {
        await userModel.findByIdAndUpdate(req.body.followAdded, {
          $push: { following: req.body.takeFollow },
        });
      }
    });
  }
  if (userTakeFollow.followers.length === 0) {
    await userModel.findByIdAndUpdate(req.body.takeFollow, {
      $push: { followers: req.body.followAdded },
    });
  } else {
    userTakeFollow.followers.forEach(async (ele) => {
      if (ele === req.body.followAdded) {
        await userModel.findByIdAndUpdate(req.body.takeFollow, {
          $pull: { followers: req.body.followAdded },
        });
      } else {
        await userModel.findByIdAndUpdate(req.body.takeFollow, {
          $push: { followers: req.body.followAdded },
        });
      }
    });
  }
};
