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

// @desc 	Create new review
// @route 	POST /api/products/:id/reviews
// @access 	Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alredyReviwed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    console.log('PRODUCT', product.reviews);

    console.log('alredyReviwed', alredyReviwed);

    if (alredyReviwed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
