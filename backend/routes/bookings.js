import express from "express";
import {createBooking } from "../controller/bookingController.js";
import { verifyUser } from "../utils/verifyToken.js"; // Correct import path

const router = express.Router();

router.post("/", verifyUser, createBooking); // Protect this route

export default router;
