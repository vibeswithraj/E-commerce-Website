import express from 'express';
const router = express.Router();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import {
  login,
  logout,
  register,
  updatePass,
  myProfile,
  orders,
  address,
  profileImage,
} from '../controller/user.js';
import { checkAuth } from '../helpers/userAuth.js';

// router.options('*', cors()); // Handle preflight requests
router.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // origin: process.env.FRONTEND_URI,
    // origin: true,
    credentials: true,
  })
);

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/me', checkAuth, myProfile);

router.post('/register', register);
router.post('/login', login);
router.post('/updatePass', updatePass);
router.post('/profileImage', checkAuth, profileImage);
router.get('/logout', logout);

router.get('/orders', checkAuth, orders);
router.get('/address', checkAuth, address);

export default router;
