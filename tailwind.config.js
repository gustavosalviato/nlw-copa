/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      backgroundImage: {
        app: 'url(/bg-app.png)',
      },

      colors: {
        green: {
          300: '#129E57',
        },

        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          500: '#323238',
          800: '#202024',
          900: '#121214',
        },

        yellow: {
          500: '#F7DD43',
          700: '#E2C932'
        }
      }
    },
  },
  plugins: [],
}
