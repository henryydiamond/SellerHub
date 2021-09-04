import express from 'express';
const router = express.Router();
import {
	getProducts,
	getProductById,
	deleteProductById,
	createProduct,
	updateProduct,
} from '../controlers/productControler.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProductById)
	.put(protect, isAdmin, updateProduct);

export default router;
