import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ test: "test" });
};
export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return next(errorHandler(401, "You can only update your account"));
  }
  try {
    const isNotValidUpdateUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
      _id: { $ne: req.user.userId },
    });
    if (isNotValidUpdateUser) {
      return next(errorHandler(409, "Please choose another username or email"));
    }
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};
