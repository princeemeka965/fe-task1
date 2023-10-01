/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        darkGreen: '#00635B',
        darkGrey: '#979797',
        monaicBlue: '#D0F7FA',
        wineRed: '#A80000',
        purple: '#9C4DE2'
      }
    },
  },
  plugins: [],
})

