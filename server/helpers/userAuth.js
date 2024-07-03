import Jwt from "jsonwebtoken";
import { userData } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const setCookies = async (res, user, message) => {
  try {
    const token = await Jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SCRETE
    );
    const oneUser = await userData
      .findOne({ email: user.email })
      .select("-createdAt -_id -updatedAt -__v");
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 90000000,
        // expires: new Date(Date.now() + 60 * 1000),
      })
      .json({ message, success: true, oneUser });
  } catch (err) {
    res.json({ error: err });
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ error: "Login first!" });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SCRETE);
    const user = await userData.findOne({ _id: decoded.id });
    if (!user) {
      return res.json({ error: "user not found!" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
};

export const errorHandler = (err, statusCode, res) => {
  return res.status(statusCode).json({
    success: false,
    error: err,
  });
};
