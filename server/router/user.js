import express from "express";
const router = express.Router();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { atcid,productData, login, logout, register, updatePass, wishlist, checkoutdetails, } from "../controller/user.js";
import { checkAuth } from "../helpers/userAuth.js";
router.use(
  cors({
    methods: ["GET", "POST"],
    origin: process.env.FRONTEND_URI,
    // origin: true,
    credentials: true,
  })
);

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/data",productData);
router.get("/me", checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/updatePass", updatePass);
router.get("/logout", logout);

router.get("/addtocart/:id",checkAuth, atcid);
router.get("/wishlist/:id",checkAuth, wishlist);
router.post("/checkoutdetails",checkoutdetails);

export default router;