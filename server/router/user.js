import express from "express";
const router = express.Router();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { atcid, login, logout, register, updatePass, wishlist, checkoutdetails, myProfile, } from "../controller/user.js";
import { checkAuth, checkOtp } from "../helpers/userAuth.js";
import { addnewproduct, orderDetails, productData, search } from "../controller/products.js";
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

router.get("/data",productData);
router.get("/products?",search);

router.get("/me", checkAuth,myProfile);
router.post("/register", register);
router.post("/checkOtp", checkOtp);
router.post("/login", login);
router.post("/updatePass", updatePass);
router.get("/logout", logout);

router.get("/addtocart/:id",checkAuth, atcid);
router.get("/wishlist/:id",checkAuth, wishlist);
router.post("/checkoutdetails",checkoutdetails);
router.post("/addnewproduct", addnewproduct);

router.get("/orderDetails",orderDetails);

export default router;