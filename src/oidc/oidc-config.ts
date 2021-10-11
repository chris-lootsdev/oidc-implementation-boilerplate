import { Configuration } from 'oidc-provider';
import { clients } from './clients';
import _ from 'lodash';
import { jwks } from './jwks';
import { claims } from './claims';

export const configuration: Configuration = {
	pkce: {
		methods: ['S256'],
		required: () => {
			return true;
		},
	},
	clients: clients,
	features: {
		devInteractions: { enabled: false }, // defaults to true
		deviceFlow: { enabled: false }, // defaults to false
		introspection: { enabled: true }, // defaults to false
		revocation: { enabled: true }, // defaults to false
	},
	cookies: {
		long: { signed: true },
		short: { signed: true },
		keys: [
			'some secret key',
			'and also the old rotated away some time ago',
			'and one more',
		],
	},
	ttl: {
		AccessToken: 1 * 60 * 60, // 1 hour in seconds
		AuthorizationCode: 100 * 60, // 10 minutes in seconds
		IdToken: 1 * 60 * 60, // 1 hour in seconds
		DeviceCode: 100 * 60, // 10 minutes in seconds
		RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
	},
	jwks: jwks,
	claims: claims,
	async findAccount(ctx, id, token) {
		// find account base on id here
		console.log(ctx);
		console.log(id);
		console.log(token);

		return {
			accountId: id,
			async claims(_use, _scope) {
				return { sub: id, first_name: 'hello', email: 'hello@example.com' };
			},
		};
	},
	async loadExistingGrant(ctx) {
		// check if grant already exists and is valid
		// debugger;

		// make new grant and agree to everything
		const grant = new ctx.oidc.provider.Grant({
			clientId: ctx.oidc.client.clientId,
			accountId: ctx.oidc.session.accountId,
		});

		const oidcScopes = _.join([...ctx.oidc.requestParamScopes], ' ');

		ctx.oidc.requestParamScopes.forEach((f) => console.log(f));
		ctx.oidc.requestParamClaims.forEach((f) => console.log(f));

		grant.addOIDCScope(oidcScopes);
		grant.addOIDCClaims(['first_name', 'last_name']);

		await grant.save();
		return grant;
	},
};
