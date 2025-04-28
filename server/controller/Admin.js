import bcrypt from "bcrypt";
import {
  errorHandler,
  setAdminCookies,
  setLogout,
} from "../helpers/userAuth.js";
import { adminData, products } from "../models/admin.js";
import { checkoutDetails } from "../models/user.js";
// import { products } from "./products.js";

export const allProductsData = async (req, res) => {
  try {
    const { search } = req.query;
    const searchList = await products.find({});
    const finalSearchList = searchList.filter((item) =>
      search.toLowerCase() === "all" || search === ""
        ? item
        : item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(finalSearchList);
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = async (req, res) => {
  const { orderId, status } = req.body;
  const findUser = await checkoutDetails.findOneAndUpdate(
    { orderId },
    { $set: { status } },
    { new: true }
  );
  //findUser.status = status;
  await findUser.save();
  const orderlist = await checkoutDetails.find();
  res.json(orderlist);
};

export const orderDetails = async (req, res) => {
  const allOrderDetails = await checkoutDetails.find({});
  res.json(allOrderDetails);
};

export const addnewproduct = async (req, res) => {
  const {
    title,
    quantity,
    category,
    description,
    image,
    price,
    like,
    stock,
    subtotal,
    sales,
    rating,
  } = req.body;
  try {
    // console.log(...products, newProduct);
    // const allProducts = { ...products, newProduct };

    const seId = await products.find({});
    const done = await products.create({
      title,
      quantity,
      category,
      description,
      id: seId.length + 1,
      image,
      price,
      like,
      subtotal,
      sales,
      bestSeller: false,
      stock,
      rating,
    });
    if (!done) return errorHandler("product not added!", 200, res);
    const allpro = await products.find({});
    res.json({ allProducts: allpro, success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
  }
};

export const bestSellers = async (req, res) => {
  try {
    const searchList = await products.find({});
    const finalSearchList = searchList.filter(
      (item) => item.bestSeller === true
    );
    return res.json(finalSearchList);
  } catch (error) {
    console.log(error);
  }
};

export const adminRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName) return errorHandler("Enter first name!", 200, res);
    if (!lastName) return errorHandler("Enter last name!", 200, res);
    if (!email) return errorHandler("Enter email!", 200, res);
    if (!password) return errorHandler("Enter password!", 200, res);

    const check = await adminData.findOne({ email });
    if (check) return errorHandler("Admin already exits!", 200, res);
    const hasedPass = await bcrypt.hash(password, 10);

    await adminData.create({
      firstName,
      lastName,
      email,
      password: hasedPass,
      isAdmin: true,
    });
    res.json({ message: "Register Successfully!" });
  } catch (error) {
    console.log(error);
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return errorHandler("Enter your email and password!", 200, res);

    const admin = await adminData.findOne({ email }).select("+password");
    if (!admin) return errorHandler("Admin not found!", 200, res);

    const checkPass = await bcrypt.compare(password, admin.password);
    if (!checkPass) return errorHandler("password is incorrect!", 200, res);

    setAdminCookies(res, admin, "Login Successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const adminLogout = (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("adminToken")
      .json({ message: "Logout Succsessfull!" });
  } catch (err) {
    errorHandler("Logout failed!", 200, res);
    console.log(err);
  }
};
