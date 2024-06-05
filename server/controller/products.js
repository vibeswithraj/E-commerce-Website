import fs from "fs";
import { checkoutDetails } from "../models/user.js";
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
export const products = data.products;

export const productData = (req, res) => {
  return res.json(data);
};

export const search = (req, res) => {
  try {
    const { search } = req.query;
    const searchList = products.filter((item) =>
      search.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(search)
    );
    return res.json(searchList);
  } catch (error) {
    console.log(error);
  }
};

export const orderDetails = async (req, res) => {
  const allOrderDetails = await checkoutDetails.find({});
  res.json({ orderlist: allOrderDetails });
};

export const changeStatus = async (req, res) => {
  const { orderId, status } = req.body;
  // console.log(req.body)
  const findUser = await checkoutDetails.findOne({ orderId });
  //findUser.shipping = shipping;
  findUser.status = status;
  await findUser.save();
  res.json({ orderlist: checkoutDetails });
};

export const addnewproduct = async (req, res) => {
  try {
    const { id, title, description, price, stock, category, image } = req.body;
    const newProduct = {
      title,
      quantity: 1,
      category,
      description,
      id,
      image,
      price,
      subtotal: price,
      like: false,
      sales: 1269,
      stock,
      rating: {
        count: 120,
        rate: 3.9,
      },
    };
    // console.log(...products, newProduct);
    const allProducts = { ...products, newProduct };
    res.json({ allProducts });
  } catch (error) {
    console.log(error);
  }
};
