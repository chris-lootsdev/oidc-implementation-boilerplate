import crypto from 'crypto';
import _ from 'lodash';
import { query, validationResult } from 'express-validator';
import { configuration as config } from './oidc-config';
import { ClientMetadata } from 'oidc-provider';

export default (app, oidc) => {
	const availClients = _.map(config.clients, (client) => client.client_id);

	const getClient = async (client_id) =>
		await _.find(config.clients, (f) => f.client_id == client_id);

	const base64URLEncode = async (str: Buffer) =>
		await str
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '');

	const generateVerifier = async () =>
		await base64URLEncode(crypto.randomBytes(32));

	const sha256 = async (buffer: Buffer | string) =>
		await crypto.createHash('sha256').update(buffer).digest();

	const generateChallenge = async (verifier: string) =>
		await base64URLEncode(await sha256(verifier));

	const getAuthCodeUri = async (clientConfig: ClientMetadata) => {
		debugger;
		const verifier = await generateVerifier();
		const challenge = await generateChallenge(verifier);
		return `/oidc/auth?client_id=${clientConfig.client_id}
						&redirect_uri=${clientConfig.redirect_uris[0]}
						&response_type=code
						&code_challenge=${challenge}
						&code_challenge_method=S256
						&scope=openid%20profile%20email`
			.replace(/  |\r\n|\n|\r/gm, '')
			.replace(/\t/g, '');
	};

	const getImplicitUri = async (clientConfig: ClientMetadata) => {
		return `/oidc/auth?client_id=${clientConfig.client_id}
						&redirect_uri=${clientConfig.redirect_uris[0]}
						&response_type=id_token
						&nonce=${Math.random()}
						&scope=openid%20profile%20email`
			.replace(/  |\r\n|\n|\r/gm, '')
			.replace(/\t/g, '');
	};

	app.get(
		'/login',
		query('client_id')
			.exists()
			.withMessage('missing the client_id parameter')
			.bail()
			.isIn(availClients)
			.withMessage(
				'not a valid client id, please request a client to be created from Web Apps Team if you would like to authenticate using this application.',
			),
		async (req, res) => {
			// return validation errors if any
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const clientConfig = await getClient(req.query.client_id);

			const supportedGrantTypes = ['authorization_code', 'implicit'];
			const currentGrantType = _.find(supportedGrantTypes, (grantType) =>
				_.find(clientConfig.grant_types, (f) => f === grantType),
			);

			if (!currentGrantType)
				return res.status(500).json({
					error: `clients can only use supported grant_types i.e. ${_.join(
						supportedGrantTypes,
						',',
					)}`,
				});

			switch (currentGrantType) {
				case 'authorization_code':
					const malakia = await getAuthCodeUri(clientConfig);
					return res.redirect(malakia);
				case 'implicit':
					const malakia2 = await getImplicitUri(clientConfig);
					return res.redirect(malakia2);
				default:
					return res.redirect('/uh-oh-not-found');
			}
		},
	);

	// SPA pages
	const spaPages: string[] = ['/interaction/:grant', '/oidctoken'];

	spaPages.forEach((page) => {
		app.get(page, async (_req, res) => {
			// The initial route hit by the client (Relying Party) that renders the login view if needed.
			res.sendFile(__dirname + '/public/index.html');
		});
	});

	// login page
	// app.get('/interaction/:grant', async (_req, res) => {
	// 	// The initial route hit by the client (Relying Party) that renders the login view if needed.
	// 	res.sendFile(__dirname + '/public/index.html');
	// });

	// post login
	app.post('/interaction/:grant/login', (req, res) => {
		// const result = {
		// 	// an error field used as error code indicating a failure during the interaction
		// 	error: 'access_denied',

		// 	// an optional description for this error
		// 	error_description:
		// 		'Insufficient permissions: scope out of reach for this Account',
		// };

		// result should be an object with some or all the following properties
		debugger;
		const result = {
			// authentication/login prompt got resolved, omit if no authentication happened, i.e. the user
			// cancelled
			login: {
				accountId: '7ff1d19a-d3fd-4863-978e-8cce75fa880c', // logged-in account id
				// acr: 'asd', // acr value for the authentication
				remember: false, // true if provider should use a persistent cookie rather than a session one, defaults to true
				// ts: now(), // unix timestamp of the authentication, defaults to now()
				// key: ['asd'],
			},
		};

		return oidc.interactionFinished(req, res, result); // result object below
	});
};
