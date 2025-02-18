import express from "express";
import { createTour, updateTour, deleteTour, getSingleTour, getAllTours, getTourBySearch, getFeaturedTours, getTourCount } from '../controllers/tourController.js';
import { verifyAdmin, verifyUser } from "../utils/verifyTokens.js";

const router = express.Router()

router.post('/', verifyAdmin, createTour)

// Update an existing tour
router.put("/:id", verifyAdmin, updateTour);

// Delete a tour
router.delete("/:id", verifyAdmin, deleteTour);

// Get a single tour by ID
router.get("/:id", getSingleTour);

// Get all tours
router.get("/", getAllTours);

// get tour search
router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedTours", getFeaturedTours);


router.get("/search/getTourCount", getTourCount);

export default router