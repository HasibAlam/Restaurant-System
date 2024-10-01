/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,js,jsx}"],
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        lightsalmon: '#FFA07A',
        navy: '#000080',
        peachpuff: '#FFDAB9',
        maroon: '#800000',
        chocolate: '#D2691E',
        crimson: '#DC143C',
        mistyrose: '#FFE4E1',
        lime: '#00FF00',
        mediumslateblue: '#7B68EE',
        lavenderblush: '#FFF0F5',
        fuchsia: '#FF00FF',
        deepskyblue: '#00BFFF', // Added deepskyblue color
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: ["business", "corporate"],
    darkTheme: "business",
  },
};
