import { FormSubscription } from 'final-form';

export interface AppSettingsInterface {
	subscription: FormSubscription;
	defaultLoginRedirect: string;
	loginEndpoint: string;
}

export const appSettings: AppSettingsInterface = {
	subscription: {
		submitting: true,
		pristine: true,
		submitFailed: true,
		submitSucceeded: true,
		submitError: true,
		submitErrors: true,
	},
	defaultLoginRedirect: '/change-me',
	loginEndpoint: 'http://10.138.85.221/spa-cct-api/api/v1/cp/login',
};
