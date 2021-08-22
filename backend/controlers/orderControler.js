import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// @desc 	Create new order
// @route 	POST /api/orders
// @access 	Private
export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

// @desc 	GET Order by ID
// @route 	GET /api/orders/:id
// @access 	Private
export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order && order.user._id.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error('Unauthorized Action');
	} else if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('No order found');
	}
});

// @desc 	Update Order to Paid
// @route 	PUT /api/orders/:id/pay
// @access 	Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order && order.user._id.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error('Unauthorized Action');
	} else if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('No order found');
	}
});

// @desc 	GET loggin user orders
// @route 	get /api/orders/myorder
// @access 	Private
export const getUserOrders = asyncHandler(async (req, res) => {
	const order = await Order.find({ user: req.user.id });
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('No order found');
	}
});
