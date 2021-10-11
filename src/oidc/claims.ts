export const claims: {
	[key: string]: null | string[];
} = {
	email: ['email', 'email_verified'],
	phone: ['phone_number', 'phone_number_verified'],
	profile: ['birthdate'],
};
