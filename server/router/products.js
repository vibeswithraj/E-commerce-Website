import express from 'express';
const router = express.Router();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  atcid,
  checkoutdetails,
  delAtcPro,
  getAtcPro,
  getWltPro,
  productData,
  productDetails,
  search,
  wishlist,
} from '../controller/products.js';
import { checkAuth } from '../helpers/userAuth.js';
dotenv.config({ path: './config.env' });

// router.options('*', cors()); // Handle preflight requests
router.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://e-commerce-website-xi-wine.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/data', productData);
router.get('/products?', search);
router.get('/addtocart/:id', checkAuth, atcid);
router.get('/removeatcpro/:id', checkAuth, delAtcPro);
router.get('/wishlist/:id', checkAuth, wishlist);
router.get('/atcpro', checkAuth, getAtcPro);
router.get('/wltpro', checkAuth, getWltPro);
router.get('/productdetails/:id', productDetails);
router.post('/checkoutdetails', checkoutdetails);

export default router;
