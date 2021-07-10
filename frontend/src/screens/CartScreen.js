import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartAction';
import Message from '../components/Message';

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	console.log('cartItems', cartItems);
	useEffect(() => {
		if (!productId) {
			return (
				<Message variant='info' children='You have no item in your cart' />
			);
		} else {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	return <h1>Cart</h1>;
};

export default CartScreen;
