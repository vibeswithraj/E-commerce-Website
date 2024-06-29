import { checkoutDetails } from "../models/user.js";
import { products } from "./products.js";

export const allProductsData = (req, res) => {
  try {
    const { search } = req.query;
    const searchList = products.filter((item) =>
      search.toLowerCase() === "all" || search === ""
        ? item
        : item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(searchList);
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = async (req, res) => {
  const { orderId, status } = req.body;
  console.log(req.body);
  const findUser = await checkoutDetails.findOne({ orderId });
  findUser.status = status;
  await findUser.save();
  res.json({ orderlist: checkoutDetails });
};
