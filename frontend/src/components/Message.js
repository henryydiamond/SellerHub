import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	return (
		<Alert variant={variant}>
			<i className='fas fa-exclamation-circle' />
			{children}
		</Alert>
	);
};
Message.defaultProps = {
	variant: 'info',
};
export default Message;
