import express from "express";
import {createBooking } from "../controller/orderingController.js";
import { verifyUser } from "../utils/verifyToken.js"; // Correct import path

const router = express.Router();

router.post("/",  createBooking); // Protect this route

export default router;
// verifyUser,