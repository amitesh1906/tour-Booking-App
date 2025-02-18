import User from '../models/User.js';

// Create new user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: "User successfully created",
            data: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create user, try again",
            error: err.message,
        });
    }
};

// Update user
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user, try again",
            error: err.message,
        });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user, try again",
            error: err.message,
        });
    }
};

// Get a single user by ID
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
            error: err.message,
        });
    }
};

// Get all users (with pagination)
export const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);


    try {
        const users = await User.find();

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",

            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: err.message,
        });
    }
};
