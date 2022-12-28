/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#2B303A',
        'secondary': "#4F565A",
        hh: {
          'grey': '#ABACA7',
          'red':  '#FE4A49',
          'darkred': '#D64045'
        }
      },
      fontFamily: {
        'inter': ['Inter']
      }
    },
  },
  plugins: [],
}
