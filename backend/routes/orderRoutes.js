import express from 'express';
const router = express.Router();

import { isAdmin, protect } from '../middleware/authMiddleware.js';
import {
	addOrderItems,
	getOrderById,
	getOthers,
	getUserOrders,
	updateOrderToPaid,
} from '../controlers/orderControler.js';

router.route('/').post(protect, addOrderItems).get(protect,isAdmin,getOthers);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
