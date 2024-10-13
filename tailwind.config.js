/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"custom-green-1": "#00eb04",
				"custom-green-2": "#00b508",
				"custom-green-3": "#086c0e",
				"custom-white": "#FFFBF5",
				"custom-black": "#000000",
				"custom-black-2": "#18181B",
			},
			backgroundImage: {
				"hero-gradient":
					"radial-gradient(circle at center, rgba(0, 255, 0, 0.25), transparent 50%)",
			},
		},
	},
	plugins: [],
};
