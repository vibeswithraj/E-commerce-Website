import fs from "fs";
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
