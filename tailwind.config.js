module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        50: "#FEFEFE",
        100: "#F0F0F0",
        150: "#404854",
        200: "#1E272C",
      },
      yellow: "#FBBF24",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
