import { RegisterOptions } from 'react-hook-form';

export const firstNameRules: RegisterOptions = {
	required: 'This field can\'t be empty',
	pattern: {
		value: /^[a-zA-Z]+$/,
		message: 'Only characters from a-z and A-Z are accepted.'
	},
	minLength: {
		value: 2,
		message: 'This field must be a least 2 characters'
	},
	maxLength: {
		value: 12,
		message: 'This field can not be more that 12 characters'
	}
};