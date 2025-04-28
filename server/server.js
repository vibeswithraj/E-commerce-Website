import express from 'express';
import { app } from './app.js';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { connectMongoDb } from './data/database.js';
import cookieParser from 'cookie-parser';
import userRouter from './router/user.js';
import adminRouter from './router/admin.js';
import productRouter from './router/products.js';
import cors from 'cors';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors()); // Handle preflight requests
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ['GET,POST,PUT,DELETE'], // Allowed methods
    //allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    credentials: true, // Allow credentials
  })
);
app.use('/', userRouter);
app.use('/', adminRouter);
app.use('/', productRouter);

connectMongoDb();

app.listen(process.env.PORT, () => {
  console.log('server is running');
});
