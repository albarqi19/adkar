import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef9e6",
          100: "#fceec2",
          200: "#f9dd85",
          300: "#f5c849",
          400: "#f1b21b",
          500: "#d89809",
          600: "#b07705",
          700: "#8a5a06",
          800: "#6e460a",
          900: "#59380c",
        },
        midnight: "#0c1023",
        "midnight-soft": "#161b33",
        dusk: "#1e2744",
      },
      boxShadow: {
        glow: "0 0 25px rgba(248, 200, 73, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
