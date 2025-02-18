import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming you have a User model

// Register new user
export const registerUser = async (req, res) => {
    const { username, email, password, photo } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    // Email format validation (simple regex check for now)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare user data
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            photo, // Save photo if provided
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email, role: savedUser.role }, // Include role if needed
            process.env.JWT_SECRET_KEY, // Store your secret in a .env file
            { expiresIn: '1d' }  // Token expires in 1 hour
        );

        // Set the token as HttpOnly cookie
        res.cookie("accessToken", token, {
            httpOnly: true,  // Cookie can't be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
            expires: new Date(Date.now() + 3600000),  // Cookie expires in 1 hour
            sameSite: "Strict",  // Protect against cross-site request forgery
        });

        // Send response with user data (excluding password)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                photo: savedUser.photo, // Include photo in response if provided
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, // Include role if needed
            process.env.JWT_SECRET_KEY, // Ensure this matches your .env file
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // Set the token as HttpOnly cookie
        res.cookie("accessToken", token, {
            httpOnly: true, // Cookie can't be accessed by JavaScript
            // expires: token.expiresIn
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Cookie expires in 15 days
            sameSite: "Strict", // Protect against cross-site request forgery
        });

        // Remove password field from user data before sending response
        const { password: userPassword, role, ...restUser } = user._doc;

        // Send response with user data (excluding password)
        res.status(200).json({
            token,
            success: true,
            message: "Login successful",
            data: { ...restUser }, // Send user data excluding the password
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
