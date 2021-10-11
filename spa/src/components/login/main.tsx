import React, { useContext } from 'react';
import RawForm from './form';
import { Form } from 'react-final-form';
import { ConfigContext } from '../../App';
import _ from 'lodash';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import { FORM_ERROR } from 'final-form';

export default () => {
	const { loginEndpoint, defaultLoginRedirect, subscription } =
		useContext(ConfigContext);

	const handleFormSubmit = async (formData: any) => {
		const request = await fetch(loginEndpoint, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		let response = await request.json();

		// error response
		if (!response.status) {
			return {
				[FORM_ERROR]: `Incorrect username or password`,
			};
		}

		// set all cookies
		_.forOwn(response.response, (value, key) => {
			switch (typeof value) {
				case 'object':
					Cookies.set(key, JSON.stringify(value), { path: '/' });
					break;
				default:
					Cookies.set(key, value, { path: '/' });
					break;
			}
		});

		// redirect to selected page
		const query = queryString.parse(location.search);
		const newPath = query['redirect'] ?? defaultLoginRedirect;

		// http redirect to logged in location without back btn functionality
		return location.replace(newPath);
	};

	return (
		<Form
			subscription={subscription}
			onSubmit={handleFormSubmit}
			component={RawForm}
		/>
	);
};
