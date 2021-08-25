import express from 'express';
const router = express.Router();
import {
	authUser,
	getUserProfile,
	getUsers,
	registerUser,
	updateUserProfile,
} from '../controlers/userControler.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.post('/login', authUser);

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

export default router;
