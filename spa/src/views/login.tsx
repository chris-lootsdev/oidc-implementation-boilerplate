import React, { useContext } from 'react';
import { ConfigContext } from '../App';
import LoginForm from '../components/login/main';

export default () => {
	const context = useContext(ConfigContext);
	const appConfigJson = JSON.stringify(context, null, 2);
	console.log(appConfigJson);

	return (
		<>
			<LoginForm />
		</>
	);
};
