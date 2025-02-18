import express from "express";
import {
    createReview,
    getReviewsByProduct,
    deleteReview,
} from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyTokens.js";

const router = express.Router();

// Route to create a review
router.post("/:tourId", verifyUser, createReview);

// Route to get all reviews for a specific product
router.get("/:Id", getReviewsByProduct);

// Route to delete a review by ID
router.delete("/:id", deleteReview);

export default router;
