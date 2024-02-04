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
  },
  { timestamps: true }
);
export const userData = mongoose.model("userData", userSchema);

// const atcSchema = new mongoose.Schema(
//   {
//     userID: {
//       // type: mongoose.Schema.Types.ObjectId,
//       // ref: "userData",
//       type: String,
//     },
//     addtocart: [
//       {
//         pid: {
//           type: Number,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );
// export const atcdata = mongoose.model("addToCartP", atcSchema);

// const wishlistSchema = new mongoose.Schema(
//   {
//     userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "userData",
//     },
//     wishlist: [
//       {
//         productID: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );
// export const wishlistData = mongoose.model("wishlistP", wishlistSchema);

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
    productID: [],
  },
  { timestamps: true }
);

export const checkoutDetails = mongoose.model(
  "checkoutDetails",
  checkoutdetails
);
