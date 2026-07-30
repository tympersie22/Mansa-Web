const mansaTheme = require('../design-system/mansa-theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: mansaTheme,
  },
  plugins: [],
};
