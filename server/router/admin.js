import express from 'express';
const router = express.Router();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  allProductsData,
  changeStatus,
  orderDetails,
  addnewproduct,
  adminRegister,
  adminLogin,
  adminLogout,
  bestSellers,
} from '../controller/Admin.js';
dotenv.config({ path: './config.env' });

// router.options('*', cors()); // Handle preflight requests
router.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //origin: process.env.FRONTEND_URI,
    // origin: true,
    credentials: true,
  })
);

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/allproducts?', allProductsData);
router.post('/changeStatus', changeStatus);
router.post('/addnewproduct', addnewproduct);
router.get('/orderDetails', orderDetails);
router.get('/bestsellers', bestSellers);
router.post('/admin/login', adminLogin);
router.post('/admin/register', adminRegister);
router.get('/admin/logout', adminLogout);

export default router;
