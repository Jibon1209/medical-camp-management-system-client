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
        Blue: "#3498db",
        LightBlue: "#87CEEB",
        Green: "#2ecc71",
        LightGreen: "#98FB98",
        Red: " #e74c3c",
        LightRed: "#FFA07A",
        LightGray: "#f8f9fa",
        DarkGray: "#343a40",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
