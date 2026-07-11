import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5f2ec",
        ink: "#0a0a0a",
        muted: "#6b6b6b",
        border: "#d4d0c8",
        accent: "#c45d2c",
        surface: "#eae6de"
      },
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        heading: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        body: ["Syne", "sans-serif"]
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "marquee-scroll": "marquee-scroll 30s linear infinite",
        "slide-in": "slide-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards"
      }
    }
  },
  plugins: []
};

export default config;
