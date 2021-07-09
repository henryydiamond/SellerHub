import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<Spinner loading={loading} />
			) : error ? (
				<Message variant='danger' children={error} />
			) : (
				<Row>
					{products.map(product => (
						<Col sm={12} md={6} xl={3} key={product._id}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
