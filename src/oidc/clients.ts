import { ClientMetadata } from 'oidc-provider';
const rediectToTokenUri = 'https://oidc.local.com/oidctoken';

export const clients: ClientMetadata[] = [
	{
		client_id: 'implicit',
		client_secret: 'asd',
		redirect_uris: [rediectToTokenUri],
		grant_types: ['implicit', 'refresh_token'], // implicit flow used predominantly by SPA js apps (can't be used with localhost & http)
		response_types: ['id_token'],
		token_endpoint_auth_method: 'client_secret_post', // 'client_secret_post', // how does server want to receive the secret
	},
	{
		client_id: 'authcode',
		client_secret: 'super_secret',
		grant_types: ['authorization_code', 'refresh_token'],
		redirect_uris: [rediectToTokenUri],
		post_logout_redirect_uris: ['https://test/logout'],
		response_types: ['code'],
		token_endpoint_auth_method: 'none',
	},
];
