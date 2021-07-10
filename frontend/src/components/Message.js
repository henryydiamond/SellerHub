import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	return (
		<Alert variant={variant}>
			<i className='fas fa-exclamation-circle fa-lg' />
			<span style={{ fontSize: '15px', marginLeft: '10px' }}> {children}</span>
		</Alert>
	);
};
Message.defaultProps = {
	variant: 'info',
};
export default Message;
