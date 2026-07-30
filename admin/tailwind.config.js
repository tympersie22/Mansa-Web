const mansaTheme = require('../design-system/mansa-theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...mansaTheme,
      animation: {
        ...mansaTheme.animation,
        'os-reveal': 'osReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        ...mansaTheme.keyframes,
        osReveal: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
