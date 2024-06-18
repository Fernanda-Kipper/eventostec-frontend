/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        kipperdev: {
          purple: {
            primary: '#730BA3',
            secondary: '#39005E',
            dark: '#03081f',
          },
          blue: '#1488ca',
          yellow: '#f8ab08',
          white: '#fff5f0',
          darkWhite: '#f5f7f8',
        },
      },
      width: {
        1100: '1100px',
      },
      height: {
        500: '500px',
        560: '560px',
      },
      boxShadow: {
        'custom-shadow': '0 10px 15px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
