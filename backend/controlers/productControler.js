import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc 	Fetch all products
// @route 	GET /api/products
// @access 	Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc 	Fetch single product
// @route 	GET /api/products/:id
// @access 	Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc 	DELETE product by ID
// @route 	DELETE /api/products/:id
// @access 	Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc 	CREATE product
// @route 	CREATE /api/products
// @access 	Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample Name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample Brand',
		category: 'Sample Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample Description',
	});

	const createProduct = await product.save();
	res.status(201).json(createProduct);
});

// @desc 	Update product
// @route 	UPDATE /api/products/:id
// @access 	Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		brand,
		category,
		countInStock,
		numReviews,
		description,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product && product.user._id.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error('Unauthorized Action');
	} else if (product) {
		product.name = name;
		product.price = price;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.numReviews = numReviews;
		product.description = description;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});
