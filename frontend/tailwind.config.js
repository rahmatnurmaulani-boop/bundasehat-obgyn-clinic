/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic Brand Palette
        navy: {
          DEFAULT: "#243B53", // Midnight Navy (Primary Brand, Headings)
          dark: "#1A2C3F",
          light: "#334E68",
        },
        dusty: {
          DEFAULT: "#8DAFC3", // Dusty Blue (Secondary Accent)
          light: "#BCCCDC",
          dark: "#627D98",
        },
        gold: {
          DEFAULT: "#C6A76B", // Champagne Gold (Luxury Accent)
          light: "#DFCB9B",
          dark: "#9E8043",
        },
        ivory: {
          DEFAULT: "#FAF7F2", // Warm Ivory (Main Background)
          dark: "#F0ECE1",
        },
        rose: {
          muted: "#D9A6AF", // Muted Rose (Feminine Obgyn Touch)
          soft: "#F8E8EC", // Soft Pink (Highlight Backgrounds)
        },
        sage: {
          soft: "#E6F0E9", // Soft Sage (Health / Informational)
        },
        clinic: {
          text: "#39363D", // Primary Text
          muted: "#77717A", // Secondary Supporting Text
          border: "#E8E0DF", // Dividers & Card Borders
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      boxShadow: {
        luxury:
          "0 4px 20px -2px rgba(36, 59, 83, 0.06), 0 2px 6px -1px rgba(36, 59, 83, 0.04)",
        "luxury-hover":
          "0 12px 30px -4px rgba(36, 59, 83, 0.12), 0 4px 10px -2px rgba(36, 59, 83, 0.06)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bundasehat: {
          primary: "#243B53", // Midnight Navy
          "primary-content": "#FFFFFF",
          secondary: "#8DAFC3", // Dusty Blue
          "secondary-content": "#FFFFFF",
          accent: "#C6A76B", // Champagne Gold
          "accent-content": "#FFFFFF",
          neutral: "#39363D", // Primary Text
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF", // Pure White (Cards/Surfaces)
          "base-200": "#FAF7F2", // Warm Ivory (Section Background)
          "base-300": "#E8E0DF", // Dividers / Borders
          "base-content": "#39363D",
          info: "#8DAFC3",
          success: "#3B7A57", // Medical Sage Green
          warning: "#C6A76B",
          error: "#C53030",
          "--rounded-box": "1rem", // 16px border radius untuk kartu
          "--rounded-btn": "0.625rem", // 10px border radius untuk tombol
        },
      },
    ],
    defaultTheme: "bundasehat",
  },
};
