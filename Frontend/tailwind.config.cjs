module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		fontSize: {
			xs: 'clamp(0.91rem, 0.89rem + 0.10vw, 0.96rem)',
			sm: 'clamp(1.09rem, 1.05rem + 0.21vw, 1.20rem)',
			base: 'clamp(1.31rem, 1.24rem + 0.37vw, 1.50rem)',
			lg: 'clamp(1.58rem, 1.46rem + 0.59vw, 1.88rem)',
			xl: 'clamp(1.89rem, 1.71rem + 0.89vw, 2.34rem)',
			'2xl': 'clamp(2.27rem, 2.01rem + 1.29vw, 2.93rem)',
			'3xl': 'clamp(2.72rem, 2.36rem + 1.83vw, 3.66rem)',
			'4xl': 'clamp(3.27rem, 2.75rem + 2.56vw, 4.58rem)'
		},
		extend: {
			colors: {
				/* 'background' : '#121212',
        		'overlay' : '#01796f',
        		'text' : '#ececec', */
				'primary': '#6200EE',
				'primary-dark': '#BB86FC',
				'primary-variant': '#3700B3',
				'secondary': '#03DAC6',
				'secondary-variant': '#018786',
				'background': '#ffffff',
				'background-dark': '#121212',
				'surface': '#ffffff',
				'surface-dark': '#121212',
				'error': '#B00020',
				'error-dark': '#CF6679',
				'on-primary': '#ffffff',
				'on-primary-dark': '#000000',
				'on-secondary': '#000000',
				'on-background': '#000000',
				'on-background-dark': '#ffffff',
				'on-surface': '#000000',
				'on-surface-dark': '#ffffff',
				'on-error': '#ffffff',
				'on-error-dark': '#000000'
			}
		}
	},
	plugins: []
};
