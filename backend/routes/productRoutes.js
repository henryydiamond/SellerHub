import express from 'express';
const router = express.Router();
import {
	getProducts,
	getProductById,
	deleteProductById,
} from '../controlers/productControler.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProductById);

export default router;
