/** @type {import('tailwindcss').Config} */
module.exports = {
	jit: true,
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundPosition: {
				"left--20": "left -20rem",
			},
			backgroundSize: {
				1400: "1400px",
			},
			backgroundImage: {
				"side-bar-img": "url('./src/assets/img/png/sidebar_bg.png')",
				"header-img": "url('./src/assets/img/png/topbar_bg.png')",
				"login-1-img": "url('./src/assets/img/jpg/login-1.jpg')",
				"login-2-img": "url('./src/assets/img/jpg/login-2.jpg')",
			},
			margin: {
				"1/2": "50%",
			},
			spacing: {
				76: "19rem",
				112: "24rem",
				128: "32rem",
				144: "40rem",
				160: "48rem",
				168: "56rem",
			},
			zIndex: {
				100000: 100000,
				80000: 80000,
			},
			height: {
				"1/12": "8.3334%",
				"11/12": "91.6666%",
			},
			colors: {
				"congo-brown": {
					50: "#f9f4f3",
					100: "#f0e8e4",
					200: "#e0cfc8",
					300: "#ccafa5",
					400: "#b78b80",
					500: "#a87167",
					600: "#9b615b",
					700: "#814f4d",
					800: "#6a4242",
					900: "#5d3c3c",
					950: "#2e1c1d",
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
