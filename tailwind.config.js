/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // to generate utilities as !important
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: { // custom color palette
        primary: '#441151',
        secondary: '#EE85B5',
        violet: '#883677',
        congo: '##FF958C',
        success: '#5FC790',
        warning: '#FFA600',
        danger: '#FF5630',
        dark: '#2E3A44',
        info: '#1CA7EC',
        black: '#2E3A44',
        grey1: '#A0AABF',
        grey2: '#C0C6D4',
        grey3: '#E3E8F1',
        light: '#F9FBFC',
        white: '#FFF'
      }
    },
  },
  plugins: [],
}