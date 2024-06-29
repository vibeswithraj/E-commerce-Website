import Jwt from "jsonwebtoken";
import { checkoutDetails, userData } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const setCookies = async (res, user, message) => {
  try {
    const token = Jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SCRETE
    );
    const oneUser = await userData
      .findOne({ email: user.email })
      .select("-createdAt -_id -updatedAt -__v");
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: false,
        maxAge: 10000000,
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
    const decoded = Jwt.verify(token, process.env.JWT_SCRETE);
    const { email } = decoded;
    const user = await userData.findOne({ email });
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

export const checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    otp.toString();
    const findUser = await userData.findOne({ email }).select("+userOtp");
    const { userOtp } = findUser;
    if (otp) {
      if (userOtp !== otp) {
        res.json({ error: "Wrong OTP!" });
      }
    }
    if (userOtp === otp) {
      res.json({ message: "Register Successfully!" });
    }
  } catch (error) {
    console.log(error);
  }
};
