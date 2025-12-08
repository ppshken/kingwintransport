/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
      },
      colors: {
        gold: {
          400: "#FCD34D",
          500: "#D4AF37",
          600: "#B8860B",
          700: "#AA771C",
        },
        dark: {
          900: "#0f0f0f",
          800: "#1a1a1a",
          700: "#2a2a2a",
        },
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.4)), url('/assets/Photo-135.jpg')",
      },
    },
  },
  plugins: [],
}
