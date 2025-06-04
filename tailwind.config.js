/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Blue
        secondary: '#facc15', // Yellow
        accent: '#22c55e', // Green
        danger: '#ef4444', // Red
        brand: {
          blue: '#1d4ed8',
          yellow: '#facc15',
          green: '#22c55e',
          red: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
