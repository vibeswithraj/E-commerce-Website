import mongoose from "mongoose";

const adminLoginShema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
export const adminData = mongoose.model("adminData", adminLoginShema);

const product = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    quantity: { type: Number, required: false },
    category: { type: String, required: true },
    description: { type: String, required: true },
    id: { type: Number, required: false },
    image: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    like: { type: Boolean, required: false },
    sales: { type: Number, required: false },
    stock: { type: Number, required: false },
    rating: {
      count: { type: Number, required: false },
      rate: { type: Number, required: false },
    },
    bestSeller: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const products = mongoose.model("product", product);
