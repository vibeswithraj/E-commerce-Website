import { userData } from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { errorHandler, setCookies } from "../helpers/userAuth.js";
dotenv.config({ path: "./config.env" });
//import nodemailer from "nodemailer";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName) {
      return errorHandler("Enter your name", 200, res);
    }
    if (!lastName) {
      return errorHandler("Enter your last name", 200, res);
    }
    if (!email) {
      return errorHandler("Enter your email", 200, res);
    }
    if (!password) {
      return errorHandler("Enter your password", 200, res);
    }
    const exist = await userData.findOne({ email });
    if (exist) {
      return errorHandler("user alredy exist!", 200, res);
    }
    const hasedPass = await bcrypt.hash(password, 10);

    // let generatedOtp = Math.floor(Math.random() * 999999);
    // generatedOtp.toString();

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: "wilson.johnson32@ethereal.email",
    //     pass: "jTHSbdSCDhzVSfJNaa",
    //   },
    // });

    // const info = await transporter.sendMail({
    //   from: '"3legant E-commerce" <3legant@gmail.com>', // sender address
    //   to: `${email}`, // list of receivers
    //   subject: "OTP Verification", // Subject line
    //   text: `Hello ${firstName}.`, // plain text body
    //   html: `<b>Your OTP is ${generatedOtp}</b>`, // html body
    // });
    // console.log("Message sent: %s", info.messageId);\

    //res.json({ otp: generatedOtp });
    userData.create({
      firstName,
      lastName,
      email,
      password: hasedPass,
      // userOtp: generatedOtp,
    });
    res.json({ message: "Register Successfully!" });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return errorHandler("Enter your email and password!", 200, res);
    }
    const user = await userData.findOne({ email }).select("+password");
    if (!user) {
      return errorHandler("user not found!", 200, res);
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return errorHandler("password is incorrect!", 200, res);
    }
    setCookies(res, user, "Login Succsessfully!");
  } catch (err) {
    console.log(err);
  }
};

export const updatePass = async (req, res) => {
  const { email, oldPass, newPass, repeatPass } = req.body;
  if (!oldPass || !newPass || !repeatPass) {
    return errorHandler("please enter all filed!", 200, res);
  }
  if (newPass !== repeatPass) {
    return errorHandler("incorrect password!", 200, res);
  }
  const findUser = await userData.findOne({ email });
  if (!findUser) {
    return errorHandler("user not found!", 200, res);
  }
  const hasedPass = await bcrypt.hash(newPass, 10);
  findUser.password = hasedPass;
  await findUser.save();
  res.json({ message: "Updated succsessfully!" });
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Logout Succsessfull!" });
  } catch (err) {
    res.json({ error: "Logout failed!" });
    console.log(err);
  }
};

export const myProfile = (req, res) => {
  res.status(200).json({
    message: "My Profile",
    user: req.user,
  });
};
