import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Unable to create account" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const token = generateToken(user);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
    // res.status(200).json({ token, message: "User signed in successfully" });
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.controller.js:36 ~ signin ~ error-Error during signin:",
      error
    );
    next(error);
  }
};
function generateToken(data) {
  const payload = {
    userId: data._id,
    email: data.email,
    username: data.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "48h" });
  return token;
}
