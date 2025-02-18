import Tour from '../models/Tour.js';


//create new tour

export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create, try again",
            error: err.message,
        });
    }
};


// update
export const updateTour = async (req, res) => {
    const id = req.params.id

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update, try again",

        });
    }

};



// // Delete a tour
export const deleteTour = async (req, res) => {
    const id = req.params.id; // Assuming the ID is passed as a route parameter

    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Tour successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete the tour",

        });
    }
};

// Get a single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id; // Assuming the ID is passed as a route parameter

    try {
        const tour = await Tour.findById(id).populate('reviews');
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }
        res.status(200).json({
            success: true,
            data: tour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve the tour",
            error: err.message,
        });
    }
};

// Get all tours
export const getAllTours = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page);
    console.log(page)

    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page * 8)
            .limit(8); // You can add filters, pagination, etc., here
        res.status(200).json({
            count: tours.length,
            message: "successfull",
            success: true,
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tours",
            error: err.message,
        });
    }
};


// get tour by search
export const getTourBySearch = async (req, res) => {
    const { city, distance, maxGroupSize } = req.query;

    try {
        // Build the search filter
        const filter = {};

        if (city) filter.city = new RegExp(city, 'i'); // Case-insensitive match for city
        if (distance) filter.distance = { $gte: parseInt(distance) }; // Distance less than or equal to specified value
        if (maxGroupSize) filter.maxGroupSize = { $gte: parseInt(maxGroupSize) }

        // Find tours matching the filter
        const tours = await Tour.find(filter).populate('reviews');

        res.status(200).json({
            success: true,
            message: "Tours retrieved successfully",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to search tours",
            error: err.message,
        });
    }
};

// Get featured tours
export const getFeaturedTours = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page);
    console.log(page)

    try {
        const tours = await Tour.find({ featured: true })
            .populate('reviews')
            .limit(8); // You can add filters, pagination, etc., here
        res.status(200).json({
            count: tours.length,
            message: "successfull",
            success: true,
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tours",
            error: err.message,
        });
    }
};


export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount(); // Count all documents in the Tour collection

        res.status(200).json({
            success: true,
            message: "Tour count retrieved successfully",
            data: tourCount
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tour count",
            error: err.message,
        });
    }
};
