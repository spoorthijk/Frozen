import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminDesertRoutes from "./routes/adminDesertRoutes.js"
import authRoutes from './routes/auth.js';
import desertRoutes from './routes/desert.js';
import usersRoutes from './routes/users.js';
import reviewsRoutes from './routes/reviews.js';
import bookingRoutes from './routes/ordering.js'; // Import booking routes

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Allow requests from localhost:3000 only
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected ",process.env.MONGO_URI);
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Route mounting
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/deserts', desertRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.use("/api/admin", adminDesertRoutes);

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.listen(port, () => {
  connect();
  console.log(`Server is running on port is set to ${port}`);
});
