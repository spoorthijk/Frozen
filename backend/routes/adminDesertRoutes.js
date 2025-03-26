import express from "express";
import {
  createDesertAdmin,
  updateDesertAdmin,
  deleteDesertAdmin,
  getSingleDesertAdmin,
  getAllDesertsAdmin,
} from "../controller/adminDesertController.js";

const router = express.Router();

// Optionally add middleware to protect these routes, e.g.,
// router.use(isAdmin);

// Create a new desert (admin)
router.post("/deserts", createDesertAdmin);

// Update an existing desert (admin)
router.put("/deserts/:id", updateDesertAdmin);

// Delete a desert (admin)
router.delete("/deserts/:id", deleteDesertAdmin);

// Get a single desert entry (admin)
router.get("/deserts/:id", getSingleDesertAdmin);

// Get all desert entries (admin)
router.get("/deserts", getAllDesertsAdmin);

export default router;
