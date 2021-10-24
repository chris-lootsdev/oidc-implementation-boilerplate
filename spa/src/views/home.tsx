import React from 'react';
import openImg from '../assets/rect-light.svg';
import ActiveMenuItem from '../components/layout/nav/active-menu-item';

export default () => {
	return (
		<div>
			<img
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100vh',
					zIndex: -100,
					width: '100%',
				}}
				src={openImg}
			/>

			<ActiveMenuItem />
		</div>
	);
};
