import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/connectDB.js';
import urlRouter from './src/routes/url.route.js';
import userRoute from './src/routes/user.route.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

app.use('/', urlRouter);

app.use('/user', userRoute);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
