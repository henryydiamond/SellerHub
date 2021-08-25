import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import {
	addOrderItems,
	getOrderById,
	getUserOrders,
	updateOrderToPaid,
} from '../controlers/orderControler.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
