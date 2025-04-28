import {
  atcdata,
  checkoutDetails,
  userData,
  wishlistData,
} from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { errorHandler, setCookies, setLogout } from "../helpers/userAuth.js";
import { adminData } from "../models/admin.js";
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
    await userData.create({
      firstName,
      lastName,
      email,
      password: hasedPass,
    });
    atcdata.create({ email });
    wishlistData.create({ email });
    res.json({ message: "Register Successfully!" });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return errorHandler("Enter your email and password!", 200, res);

    const user = await userData.findOne({ email }).select("+password");
    if (!user) return errorHandler("user not found!", 200, res);

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) return errorHandler("password is incorrect!", 200, res);

    setCookies(res, user, "Login Succsessfully!");
  } catch (err) {
    console.log(err);
  }
};

export const updatePass = async (req, res) => {
  const { email, oldPass, newPass, repeatPass } = req.body;
  if (!oldPass || !newPass || !repeatPass)
    return errorHandler("please enter all filed!", 200, res);

  if (newPass !== repeatPass)
    return errorHandler("incorrect password!", 200, res);

  const hasedPass = await bcrypt.hash(newPass, 10);
  const findUser = await userData.findOneAndUpdate(
    { email },
    { $set: { password: hasedPass } },
    { new: true }
  );
  if (!findUser) return errorHandler("user not found!", 200, res);

  //findUser.password = hasedPass;
  //await findUser.save();
  res.json({ message: "Updated succsessfully!" });
};

export const profileImage = async (req, res) => {
  const { image } = req.body;
  try {
    const user = await userData.findOneAndUpdate(
      { email: req.user?.email },
      { $set: { image: image } },
      { new: true }
    );
    if (!user) return errorHandler("user not found!", 200, res);
    res.json({ message: "Image Added!", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Logout Succsessfull!" });
  } catch (err) {
    errorHandler("Logout failed!", 200, res);
    console.log(err);
  }
};

export const myProfile = (req, res) => {
  res.status(200).json({
    message: "My Profile",
    user: req.user,
  });
};

export const orders = async (req, res) => {
  try {
    const checkUser = await checkoutDetails.find({ email: req.user?.email });
    if (!checkUser) return res.json({ error: "user not found!" });
    res.json({ orderList: checkUser, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const address = async (req, res) => {
  try {
    const user = await checkoutDetails.findOne({ email: req?.user?.email });
    if (!user) return errorHandler("user not found!", 200, res);

    const userObj = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      number: user.phoneNumber,
    };
    res.json(userObj);
  } catch (error) {
    console.log(error);
  }
};
