import React from 'react';
import Message from '../components/Message';

const CartScreen = ({ match }) => {
	if (!match.params.id) {
		return <Message variant='info' children='You have no item in your cart' />;
	} else {
		return <h1>Cart</h1>;
	}
};

export default CartScreen;
