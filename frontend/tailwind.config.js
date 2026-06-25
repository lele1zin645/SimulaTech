/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta vinda do DESIGN.md do protótipo (indigo como primária)
        primary: {
          DEFAULT: "#4f46e5", // indigo principal das ações
          light: "#6366f1", // hover / realces
          dark: "#4338ca",
        },
        surface: {
          DEFAULT: "#f8f9ff", // fundo geral (slate bem claro)
          card: "#ffffff", // cards
          muted: "#eff4ff", // áreas de destaque suave
          ring: "#e5eeff",
        },
        ink: {
          DEFAULT: "#0b1c30", // texto principal
          soft: "#464554", // texto secundário
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Geist", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // "Soft Large" definida no design system
        soft: "0 10px 25px -5px rgba(11,28,48,0.06), 0 8px 10px -6px rgba(11,28,48,0.05)",
        lift: "0 12px 24px -6px rgba(79,70,229,0.35)",
      },
      borderRadius: {
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};
