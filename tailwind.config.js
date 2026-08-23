export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF6E6',
          deep: '#F4EDD8',
          soft: '#FDFAF0',
        },
        emerald: {
          deep: '#0B5A33',
          mid: '#0E6B3D',
          dark: '#053B21',
          night: '#042C19',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E3C877',
          pale: '#F0DFA8',
        },
        ink: '#2F3A2F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        arabic: ['Amiri', 'serif'],
        body: ['Jost', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
}
