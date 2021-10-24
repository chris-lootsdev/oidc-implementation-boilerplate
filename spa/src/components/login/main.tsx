import React, { useContext } from 'react';
import RawForm from './form';
import { Form } from 'react-final-form';
import { ConfigContext } from '../../App';
import _ from 'lodash';
// import Cookies from 'js-cookie';
// import queryString from 'query-string';
// import { FORM_ERROR } from 'final-form';

export default () => {
	const { loginEndpoint, subscription } = useContext(ConfigContext);

	const handleFormSubmit = async (formData: any) => {
		const relativeLoginEndpoint = `${window.location.pathname}/${loginEndpoint}`;
		const request = await fetch(relativeLoginEndpoint, {
			method: 'POST',
			redirect: 'follow',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		debugger;

		window.location.href = request.url;

		// let response = await request.json();

		// // error response
		// if (!response.status) {
		// 	return {
		// 		[FORM_ERROR]: `Incorrect username or password`,
		// 	};
		// }
	};

	return (
		<Form
			subscription={subscription}
			onSubmit={handleFormSubmit}
			component={RawForm}
		/>
	);
};
