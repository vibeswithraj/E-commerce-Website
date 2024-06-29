import { checkoutDetails } from "../models/user.js";
import fs from "fs";
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
export const products = data.products;

export const productData = (req, res) => {
  return res.send(products);
};

export const search = (req, res) => {
  try {
    const { search, price } = req.query;
    const searchList = products
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
    return res.json(searchList);
  } catch (error) {
    console.log(error);
  }
};

export const orderDetails = async (req, res) => {
  const allOrderDetails = await checkoutDetails.find({});
  res.json({ orderlist: allOrderDetails });
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
