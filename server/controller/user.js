import fs from "fs";
// import { atcdata, wishlistData } from "../models/user.js";
import { checkoutDetails, userData } from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { errorHandler, setCookies } from "../helpers/userAuth.js";
dotenv.config({ path: "./config.env" });
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const products = data.products;

export const productData = (req, res) => {
  res.json(data);
};

export const atcid = async (req, res) => {
  try {
    const pid = +req.params.id;
    // const { userID } = req.query;
    const product = await products.find((i) => i.id === pid);
    if (!product) {
      return errorHandler("product not found!", 200, res);
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

export const wishlist = async (req, res) => {
  try {
    const pid = +req.params.id;
    // const {userEmail} = req.body;
    const product = products.find((i) => i.id === pid);
    res.json(product);
    // const {id,title,category,description,image,price,rating} = product;
    // await wishlistData.create({id,title,category,description,image,price,rating,userEmail});
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

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
  } catch (err) {
    console.log(err);
  }
  const hasedPass = await bcrypt.hash(password, 10);
  userData.create({
    firstName,
    lastName,
    email,
    password: hasedPass,
  });
  res.json({ message: "Register Successfully!" });
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
    //res.json({ message: "Login Successfull!", user });
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
  // const updatedUser = userData.findOneAndUpdate(
  //   { email },
  //   { $Set: req.body },
  //   { new: true },
  // );
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

export const atcData = (req, res) => {};

export const delatcp = async (req, res) => {
  //const id = +req.params.id;
  // const findProductIndex = addToCartProducts.find((i) => i.id === id);
  // addToCartProducts.splice(findProductIndex, 1);
  // res.send(product);
  // const removeProduct = addToCartProducts.filter((i) => {
  //   return i.id !== id;
  // });
  // addToCartProducts(removeProduct);
  // res.send(addToCartProducts);

  const id = +req.params.id;
  const findProductIndex = userData.addToCart.find((i) => i.id === id);
  if (!findProductIndex) {
    return res.json({ error: "product not found!" });
  }
  await userData.addToCart.findOneAndDelete(findProductIndex);
  // const newData = await userData.findOneAndDelete(findProductIndex);
  //userData = newData.save();
};

export const delwlp = (req, res) => {
  // const id = +req.params.id;
  // const findProductIndex = wishlistProducts.find((i) => i.id === id);
  // const wishlistProductsList = wishlistProducts.splice(findProductIndex, 1);
  // res.send(wishlistProductsList);
};

export const checkoutdetails = async (req, res) => {
  const productID = [];
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      townCity,
      state,
      zipCode,
      country,
      addToCart,
    } = req.body;
    addToCart.map((item) => {
      productID.push(item.id);
    });
    const finduser = await userData.findOne({ email });
    if (!finduser) {
      return res.json({ error: "user not found!" });
    }
    const cd = await checkoutDetails.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      townCity,
      state,
      zipCode,
      country,
      productID,
    });
    cd.save();
    res.json({ message: "order succsessfull!" });
  } catch (err) {
    res.json({ error: err });
    console.log(err);
  }
};