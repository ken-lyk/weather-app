/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'duitnow': {
          'primary': '#1a365d',
          'secondary': '#2d3748',
        },
      },
    },
  },
  plugins: [],
}

