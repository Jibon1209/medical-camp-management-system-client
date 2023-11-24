/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        Primary: "#6C5CE7",
        Background: "#E7F2FF",
        Green: "#2ecc71",
        LightGreen: "#98FB98",
        Red: " #e74c3c",
        LightRed: "#FFA07A",
        TextColor: "#2D2D2D",
        secondary: "#D4D4D4",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
