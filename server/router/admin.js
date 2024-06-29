import express from "express";
const router = express.Router();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { allProductsData, changeStatus } from "../controller/Admin.js"
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

router.get("/allproducts?", allProductsData);
router.post("/changeStatus", changeStatus);

export default router;
