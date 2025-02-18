import express from "express";
import { createBooking, getBooking, getAllBooking } from "../controllers/bookingController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyTokens.js";

const router = express.Router();

// Route to create a review
router.post("/", verifyUser, createBooking);

router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBooking);


export default router;
