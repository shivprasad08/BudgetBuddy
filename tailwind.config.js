/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#1a1625",
          secondary: "#252033",
          tertiary: "#2d2640",
        },
        purple: {
          primary: "#7e69ab",
          light: "#9b87f5",
        },
      },
    },
  },
  plugins: [],
}
