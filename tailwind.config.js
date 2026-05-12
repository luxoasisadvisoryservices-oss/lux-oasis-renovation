/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        // Lux Oasis brand palette — tweak here if needed
        brand: {
          sand:    "#f5f0e8",
          ivory:   "#faf8f3",
          gold:    "#b5892e",
          "gold-lt": "#d4a843",
          amber:   "#92400e",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
