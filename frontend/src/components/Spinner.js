import React from 'react';
import { css } from '@emotion/react';
import { GridLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
	const override = css`
		display: block;
		margin: 0 auto;
		z-index: 15;
		position: absolute;
		top: 50%;
		left: 50%;
		bottom: 50%;
		border-color: red;
	`;

	return (
		<div>
			<GridLoader
				color='#ffb932'
				loading={loading}
				css={override}
				size={20}
				margin={5}
			/>
		</div>
	);
};

export default Spinner;
