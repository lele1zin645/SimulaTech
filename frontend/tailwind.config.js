/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#121319",
        surface: {
          lowest: "#0d0e14",
          low: "#1b1b22",
          DEFAULT: "#1f1f26",
          high: "#292930",
          highest: "#34343b",
        },
        line: {
          DEFAULT: "#454653",
          strong: "#908f9e",
        },
        ink: {
          DEFAULT: "#e4e1eb",
          soft: "#c6c5d5",
          dim: "#908f9e",
        },
        primary: {
          DEFAULT: "#bdc2ff",
          btn: "#818cf8",
          on: "#131e8c",
        },
        cyan: {
          DEFAULT: "#5de6ff",
        },
        amber: {
          DEFAULT: "#f7bd3e",
        },
        rose: {
          DEFAULT: "#ffb4ab",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-indigo": "0 0 18px rgba(129,140,248,0.45)",
        "glow-cyan": "0 0 14px rgba(93,230,255,0.35)",
        "glow-green": "0 0 22px rgba(52,211,153,0.45)",
        "glow-amber": "0 0 22px rgba(247,189,62,0.4)",
        "glow-rose": "0 0 22px rgba(255,180,171,0.4)",
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};
