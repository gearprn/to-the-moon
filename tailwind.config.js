module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        50: "##FEFEFE",
        100: "#F0F0F0",
        150: "#404854",
        200: "#1E272C",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
