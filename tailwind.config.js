/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0314",
        secondary: "#151312",
        accent: "#AB8BFF",
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};

