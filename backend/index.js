import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/connectDB.js';
import urlRouter from './src/routes/url.route.js';
import userRoute from './src/routes/user.route.js';
// import { errorHandler } from './src/middlewares/errorHandler.js';
// import { ApiError } from './src/lib/ApiError.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

app.use('/', urlRouter);

app.use('/user', userRoute);

connectDB();

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

// // Catch unhandled errors in routes
// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log error stack

//   if (err instanceof ApiError) {
//     // If error is an instance of your custom ApiError class, use its status and message
//     return res.status(err.statusCode || 500).json({
//       success: false,
//       message: err.message || 'Internal Server Error',
//     });
//   }

//   // Generic error handler for other unhandled exceptions
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong, please try again later.',
//   });
// });

// // If a route does not exist, return 404
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
