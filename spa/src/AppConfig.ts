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
	loginEndpoint: 'login',
};
