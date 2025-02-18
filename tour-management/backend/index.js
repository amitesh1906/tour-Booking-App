import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
    credentials: true
}




// MongoDB Connection

mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    }
    catch (err) {
        console.error('Error connecting to MongoDB');
    }
};

// Middleware
app.use(express.json())
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.json());


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);





// Start the server
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on http://localhost:${PORT}`);
});
