import { errorHandler } from "../helpers/userAuth.js";
import { products } from "../models/admin.js";
import {
  atcdata,
  checkoutDetails,
  userData,
  wishlistData,
} from "../models/user.js";
// import fs from "fs";
// const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
// export let products = data.products;

export const productData = (req, res) => {
  return res.send(products);
};

export const search = async (req, res) => {
  try {
    const { search, price } = req.query;
    const searchList = await products.find({});
    const finalSearchList = searchList
      .filter((item) =>
        search.toLowerCase() === "all" || search === ""
          ? item
          : item.category.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) =>
        price.toLowerCase() === "all price"
          ? item
          : parseInt(price) === 400.0
          ? parseInt(item.price) >= parseInt(price)
          : parseInt(item.price) >= price.split(" - ")[0] &&
            parseInt(item.price) <= price.split(" - ")[1]
      );
    return res.json(finalSearchList);
  } catch (error) {
    console.log(error);
  }
};

export const checkoutdetails = async (req, res) => {
  const orderId = Math.floor(Math.random() * 99999);
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
      payment,
      mainSubTotal,
      status,
      cardNumber,
      shipping,
    } = req.body;

    const finduser = await userData.findOne({ email });
    if (!finduser) return errorHandler("user not found!", 200, res);

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
      addToCart,
      payment,
      shipping,
      mainSubTotal,
      status,
      cardNumber,
      orderId,
    });
    await cd.save();

    const allProducts = await products.find({});
    const arr = allProducts.map((item, index) => {
      if (item.id === addToCart[0].id) {
        console.log(item);
        return { ...item, stock: item.stock - addToCart[0].quantity };
      }
    });
    console.log(arr);
    products = arr;

    const findOrder = await checkoutDetails.findOne({ orderId });
    if (!findOrder) {
      return errorHandler("Order Failed!", 200, res);
    }
    const finalRes = {
      orderId: orderId,
      mainSubTotal: mainSubTotal,
      payment: payment,
      shipping: shipping,
      createdAt: findOrder.createdAt,
      addToCart: findOrder.addToCart,
    };
    res.json({ message: "order succsessfull!", finalRes });
  } catch (err) {
    console.log(err);
  }
};

export const atcid = async (req, res) => {
  try {
    const pid = +req.params.id;
    const userOne = await atcdata.findOne({ email: req.user?.email });
    if (!pid) return errorHandler("Product id not found!", 200, res);

    // res.json(product);
    const allProducts = await products.find({});
    const product = allProducts.find((i) => i.id === pid);
    if (!product) return errorHandler("product not found!", 200, res);

    const alredyAdded = await userOne.addtocart.find((i) => i.id === pid);

    if (!alredyAdded) {
      userOne.addtocart.push(product);
      await userOne.save();
      res.json({ userOne, message: "Added" });
    } else res.json({ userOne, error: "Already added!" });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

export const delAtcPro = async (req, res) => {
  try {
    const pid = +req.params.id;
    const userOne = await atcdata.findOne({ email: req.user?.email });
    if (!userOne) return res.json({ error: "user not found!" });
    if (!pid) return res.json({ error: "Product id not found!" });
    userOne.addtocart = userOne.addtocart.filter((i) => i.id !== pid);
    await userOne.save();
    res.json({ userOne, message: "Removed" });
  } catch (error) {
    console.log(error);
  }
};

export const getAtcPro = async (req, res) => {
  try {
    const userOne = await atcdata.findOne({ email: req.user?.email });
    res.json(userOne);
  } catch (error) {
    console.log(error);
  }
};

export const getWltPro = async (req, res) => {
  try {
    const userOne = await wishlistData.findOne({ email: req.user?.email });
    res.json(userOne);
  } catch (error) {
    console.log(error);
  }
};

export const wishlist = async (req, res) => {
  try {
    const pid = +req.params.id;
    const userOne = await wishlistData.findOne({ email: req.user?.email });
    if (!pid) return errorHandler("Product id not found!", 200, res);

    // res.json(newProduct);
    const allProducts = await products.find({});
    const product = allProducts.find((i) => i.id === pid);
    if (!product) return errorHandler("Product not found!", 200, res);

    const newProduct = { ...product, like: (product.like = true) };
    const alredyAdded = await userOne.wishlist.find((i) => i.id === pid);

    if (!alredyAdded) {
      userOne.wishlist.push(newProduct);
      await userOne.save();
      res.json({ userOne, message: "Added" });
    } else {
      userOne.wishlist = userOne.wishlist.map((i) => {
        if (i.id === pid) {
          return { ...i, like: (product.like = false) };
        } else return i;
      });

      userOne.wishlist = userOne.wishlist.filter((i) => i.id !== pid);
      await userOne.save();
      res.json({ userOne, message: "Removed" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const productDetails = async (req, res) => {
  try {
    const id = +req.params.id;
    // const userWlt = await wishlistData.findOne({ email: req.user.email });
    // const findWlt = await userWlt.wishlist.find((i) => i.id === id);
    // if (findWlt) return res.json(findWlt);

    // const userAtc = await atcdata.findOne({ email: req.user.email });
    // const findAtc = await userAtc.addtocart.find((i) => i.id === id);
    // if (findAtc) return res.json(findAtc);
    const searchList = await products.find({});
    const finalSearchList = searchList.find((i) => i.id === id);
    if (!finalSearchList) return errorHandler("Product not found!", 200, res);
    else res.json(finalSearchList);
  } catch (error) {
    console.log(error);
  }
};
