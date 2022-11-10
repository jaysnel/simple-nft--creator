module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    textColor: {
      white: "#FFF",
      black: "#000",
      red: {
        error: '#FF0000'
      },
      purple: {
        100: '#7858A6',
        200: '#5B4B8A',
        300: '#4C3575',
        400: '#371B58',
      },
      link: "#EE4B2B"
    },
    colors: {
      purple: {
        100: '#7858A6',
        200: '#5B4B8A',
        300: '#4C3575',
        400: '#371B58',
      }
    },
    extend: {},
  },
  plugins: [],
}