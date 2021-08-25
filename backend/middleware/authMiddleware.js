import asyncHandler from 'express-async-handler';
import Jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id);
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not authorized, Please login');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('No token, unauthorized');
	}
});

const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Unauthorized! Please, Sign in as an administrator');
	}
};
export { protect, isAdmin };
