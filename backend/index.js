import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import desertRoutes from './routes/desert.js';
import usersRoutes from './routes/users.js';
import reviewsRoutes from './routes/reviews.js';
import bookingRoutes from './routes/bookings.js'; // Import booking routes

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/deserts', desertRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRoutes);
app.use('/api/v1/bookings', bookingRoutes); // Use booking routes

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});