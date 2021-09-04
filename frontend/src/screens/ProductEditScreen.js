import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { listProductDetails } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { set } from 'mongoose';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	// const userUpdate = useSelector(state => state.userUpdate);
	// const {
	// 	loading: loadingUpdate,
	// 	error: errorUpdate,
	// 	success: successUpdate,
	// } = userUpdate;

	useEffect(() => {
		if (!product || !product.name || product._id !== productId) {
			dispatch(listProductDetails(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [product, productId, dispatch, history]);

	const submitHandler = e => {
		e.preventDefault();
		// Update Product
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-ligth my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit Product</h1>
				{/* {loadingUpdate && <Spinner />}
				{errorUpdate && <Message variant='danger' children={errorUpdate} />} */}
				{loading ? (
					<Spinner />
				) : error ? (
					<Message variant='danger' children={error} />
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter Name'
								value={name}
								onChange={e => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Price </Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter Price'
								value={price}
								onChange={e => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Image Url'
								value={image}
								onChange={e => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='brand'>
							<Form.Label>Brand </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Brand'
								value={brand}
								onChange={e => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='category'>
							<Form.Label>Category </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Category'
								value={category}
								onChange={e => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock </Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter Count In Stock'
								value={countInStock}
								onChange={e => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Description </Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								placeholder='Enter Description'
								value={description}
								onChange={e => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;