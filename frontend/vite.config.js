import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O proxy faz o front (porta 5173) encaminhar qualquer chamada que comece
// com /api para o back-end (porta 3001). Assim, no código do front, basta
// chamar fetch("/api/pergunta") — sem se preocupar com CORS nem com URL fixa.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
