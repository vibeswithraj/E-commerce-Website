import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export const userData = mongoose.model("userData", userSchema);

const atcSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    addtocart: [],
  },
  { timestamps: true }
);
export const atcdata = mongoose.model("addToCart", atcSchema);

const wishlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    wishlist: [],
  },
  { timestamps: true }
);
export const wishlistData = mongoose.model("wishlist", wishlistSchema);

const checkoutdetails = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    townCity: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    addToCart: Array,
    shipping: {
      type: String,
      required: true,
    },
    mainSubTotal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    orderId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const checkoutDetails = mongoose.model(
  "checkoutDetails",
  checkoutdetails
);
