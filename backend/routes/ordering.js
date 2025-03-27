import express from "express";
import {createBooking, getUserBookings } from "../controller/orderingController.js";
import { verifyUser } from "../utils/verifyToken.js"; // Correct import path

const router = express.Router();

router.post("/",  createBooking); // Protect this route

router.get("/user/:id", getUserBookings);

export default router;
// verifyUser,