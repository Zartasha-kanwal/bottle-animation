/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // or wherever your components are
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        caveat: ['"Caveat Brush"', "cursive"],
        winky: ['"Winky Rough"', "cursive"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1440px", // 🔹 Custom 1440px breakpoint
        "2xl": "1536px", // Large desktops
      },
    },
  },
  plugins: [],
};
