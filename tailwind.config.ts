import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#151314",
          light: "#252223",
          dark: "#0C0B0C",
        },
        naija: {
          DEFAULT: "#008751",
          dark: "#00563A",
          light: "#E6F4ED",
        },
        gold: {
          DEFAULT: "#FFC800",
          hover: "#E5B400",
          light: "#FFF9E6",
        },
        canvas: "#FAFAF7",
        surface: {
          DEFAULT: "#FFFFFF",
          warm: "#F1F0EA",
          border: "#E4E3DB",
        },
        subtle: "#5F6368",
        darktext: "#1B1B1B",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        brand: "12px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(21, 19, 20, 0.05), 0 10px 24px -8px rgba(21, 19, 20, 0.08)",
        elevated: "0 4px 12px rgba(21, 19, 20, 0.08), 0 20px 40px -12px rgba(21, 19, 20, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

