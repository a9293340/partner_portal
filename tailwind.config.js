/** @type {import('tailwindcss').Config} */
module.exports = {
	jit: true,
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			spacing: {
				112: '24rem',
				128: '32rem',
				144: '40rem',
			},
			zIndex: {
				100000: 100000,
				80000: 80000,
			},
			colors: {
				'congo-brown': {
					50: '#f9f4f3',
					100: '#f0e8e4',
					200: '#e0cfc8',
					300: '#ccafa5',
					400: '#b78b80',
					500: '#a87167',
					600: '#9b615b',
					700: '#814f4d',
					800: '#6a4242',
					900: '#5d3c3c',
					950: '#2e1c1d',
				},
			},
		},
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
