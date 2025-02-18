import mongoose from "mongoose";
import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

// Create a new review
export const createReview = async (req, res) => {
    const { tourId } = req.params; // Extract tourId from request parameters


    const newReview = new Review({ ...req.body }); // Create a new Review instance with request body data

    try {
        // Save the new review
        const savedReview = await newReview.save();

        // Update the tour's reviews array with the new review's ID
        await Tour.findByIdAndUpdate(
            tourId,
            { $push: { reviews: savedReview._id } }, // Use $push to add the review ID to the array
            { new: true } // Return the updated document (optional)
        );

        // Send a success response
        res.status(200).json({
            success: true,
            message: 'Review submitted successfully',
            data: savedReview,
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({
            success: false,
            message: 'An error occurred while submitting the review',
            error: err.message,
        });
    }
};


// Get all reviews for a specific tour
export const getReviewsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId });
        if (!reviews || reviews.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No reviews found for this tour" });
        }

        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res
                .status(404)
                .json({ success: false, message: "Review not found" });
        }

        // Optionally: Update the tour's average rating and review count
        const allReviews = await Review.find({ productId: review.productId });
        const tour = await Tour.findById(review.productId);
        if (tour) {
            const avgRating =
                allReviews.length === 0
                    ? 0
                    : allReviews.reduce((acc, curr) => acc + curr.rating, 0) /
                    allReviews.length;

            tour.reviews = allReviews.length;
            tour.avgRating = avgRating;
            await tour.save();
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};
