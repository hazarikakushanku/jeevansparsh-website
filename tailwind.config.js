/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rehab: {
          blue: "#0A2540",
          yellow: "#FACC15",
          white: "#FFFFFF",
          lightblue: "#E0E7FF",
        },
        jeevansparsh: {
          blue: "#0D1B40",
          navy: "#0A1628",
          navydark: "#060E1C",
          yellow: "#FACC15",
          gold: "#F59E0B",
          sky: "#BAD4F5",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
