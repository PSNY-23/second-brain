/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#6156AB",
        lightBlue: "#D2D9F2",
        black:"#4b5563 "
      },
    },
  },
  plugins: [],
};
