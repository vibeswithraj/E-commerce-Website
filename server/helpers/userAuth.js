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
      .findOne({email: user.email})
      .select("-createdAt -_id -updatedAt -__v -email");
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: false,
        // maxAge: new Date(Date.now() + 60 * 1000),
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
      res.json({ error: "Login first!" });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SCRETE);
    const {email} = decoded;
    const findUser = await userData.findOne({email});
    if (!findUser) {
      return res.json({ error: "user not found!" });
    }
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