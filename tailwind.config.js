/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'kipperdev': {
          'purple': {
            primary: '#730BA3',
            secondary: '#39005E',
            dark: '#03081f',
          },
          'blue': '#1488ca',
          'yellow': '#f8ab08',
          'white': '#fff5f0',
        }
      }
    },
  },
  plugins: [],
}

