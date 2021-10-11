import React from 'react';
import ssoImg from '../../assets/sso-logo.png';

export default ({ iconOnly = false }) => (
	<a
		className='adfs-click'
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			cursor: 'pointer',
		}}
		onClick={() => {
			alert('redirect to adfs');
		}}
	>
		<img src={ssoImg} style={{ width: 25, marginRight: 10 }} />
		{!iconOnly && <div className='thin info heavy'>Company SSO</div>}
	</a>
);
