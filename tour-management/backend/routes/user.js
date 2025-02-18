import express from 'express';
import {
    createUser,
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers
} from '../controllers/userController.js';

const router = express.Router();
import { verifyUser, verifyAdmin } from '../utils/verifyTokens.js';

// Route to create a new user
router.post('/', createUser);

// Route to update an existing user by ID
router.put('/:id', verifyUser, updateUser);

// Route to delete a user by ID
router.delete('/:id', verifyUser, deleteUser);

// Route to get a single user by ID
router.get('/:id', verifyUser, getSingleUser);

// Route to get all users (with pagination)
router.get('/', verifyAdmin, getAllUsers);

export default router;
