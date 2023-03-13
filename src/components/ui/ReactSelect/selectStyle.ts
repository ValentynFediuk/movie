import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
	container: (provided) => ({
		...provided,
	}),
	control: () => ({
		display: 'flex',
		padding: 10,
		borderWidth: '1px',
		borderColor: '#c3c0c0',
		borderStyle: 'solid',
		borderRadius: '10px',
		'&:hover': {
			borderColor: '#797979',
			borderStyle: 'solid',
			borderRadius: '10px',
		},
	}),
	singleValue: (provided) => ({
		...provided,
		color: 'white',
	}),
	placeholder: (defaultStyles) => ({
		...defaultStyles,
		color: 'white',
	}),
	option: (defaultStyles) => ({
		...defaultStyles,
		backgroundColor: '#1d1d1d',
		color: 'white',
		'&:hover': {
			backgroundColor: '#0feffd',
			color: 'white',
		},
	}),
};

