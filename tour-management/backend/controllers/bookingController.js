import Booking from "../models/Booking.js";

// Create a new Booking instance with request body data
export const createBooking = async (req, res) => {

    const newBooking = new Booking(req.body);

    try {
        // Save the booking to the database
        const savedBooking = await newBooking.save();

        // Send a success response with the saved booking details
        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: savedBooking,
        });
    } catch (err) {
        // Handle errors and send an error response

        res.status(500).json({
            success: true,
            message: "Failed to create booking",
            error: err.message,
        });
    }
};

// get a single booking
export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);

        res.status(200).json({
            success: true,
            message: "successfully",
            data: book,
        });
    }
    catch (err) {
        // Handle errors and send an error response

        res.status(404).json({
            success: true,
            message: "not found",
            error: err.message,
        });
    }
}

// get a All booking
export const getAllBooking = async (req, res) => {


    try {
        const books = await Booking.find();

        res.status(200).json({
            success: true,
            message: "successfully",
            data: books,
        });
    }
    catch (err) {
        // Handle errors and send an error response

        res.status(500).json({
            success: true,
            message: "internal server error",
            error: err.message,
        });
    }
}