/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["IBM Plex Sans", "sans-serif"],
        lilita: ["Lilita One", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        monumentRegular: ["MonumentRegular", "san-serif"],
        monumentBold: ["MonumentUltraBold", "san-serif"],
      },
    },
  },
  plugins: [],
};
