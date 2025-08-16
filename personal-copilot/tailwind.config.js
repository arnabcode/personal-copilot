/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#5458e6",
          700: "#4749d6",
          800: "#3c3fbe",
          900: "#32349a",
          950: "#1f2357",
        },
        muted: "#0b1220",
        card: "#0f172a",
        accent: "#22d3ee",
      },
      borderRadius: {
        xl: 16,
        '2xl': 24,
      },
    },
  },
  plugins: [],
}

