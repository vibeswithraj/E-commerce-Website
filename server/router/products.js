import express from "express";
const router = express.Router();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import {
  atcid,
  checkoutdetails,
  productData,
  search,
  wishlist,
} from "../controller/products.js";
import { checkAuth } from "../helpers/userAuth.js";
dotenv.config({ path: "./config.env" });

router.use(
  cors({
    methods: ["GET", "POST"],
    //origin: process.env.FRONTEND_URI,
    origin: true,
    credentials: true,
  })
);

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/data", productData);
router.get("/products?", search);
router.get("/addtocart/:id", atcid);
router.get("/wishlist/:id", wishlist);
router.post("/checkoutdetails", checkoutdetails);

export default router;
