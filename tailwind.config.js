/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'screen-180': 'calc(100vh - 180px)',
      },
    },
  },
  plugins: [],
}

