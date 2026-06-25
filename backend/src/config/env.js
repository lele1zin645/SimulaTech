import "dotenv/config";

export const config = Object.freeze({
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  openRouter: Object.freeze({
    apiKey: process.env.OPENROUTER_API_KEY ?? "",
    model: process.env.OPENROUTER_MODEL ?? "openai/gpt-oss-120b:free",
    baseUrl: "https://openrouter.ai/api/v1",
    timeoutMs: Number(process.env.OPENROUTER_TIMEOUT_MS) || 30000,
  }),
});

export function getMissingConfig() {
  const missing = [];
  if (!config.openRouter.apiKey) missing.push("OPENROUTER_API_KEY");
  return missing;
}
