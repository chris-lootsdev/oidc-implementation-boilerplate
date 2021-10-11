import express, { json, urlencoded } from 'express';
import cors from 'cors';

export default (app, oidc) => {
	// read application/json post in req.body
	app.use(express.json());

	// read form post in req.body
	app.use(
		express.urlencoded({
			extended: true,
		}),
	);

	// register /oidc onwards in provider
	app.use('/oidc', oidc.callback());

	app.set('port', process.env['PORT'] || 443);

	// register that rest of app is api
	app.use(json());
	app.use(urlencoded({ extended: false }));
	app.use(cors());
};
