import { AppError } from "./AppError.js";

function sanitize(text) {
  let result = text.trim().replace(/```(?:json)?/gi, "").trim();

  const start = result.indexOf("{");
  const end = result.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    result = result.slice(start, end + 1);
  }

  return result
    .replace(/\/\/[^\n\r]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/,\s*([}\]])/g, "$1")
    .trim();
}

export function parseJsonObject(text) {
  try {
    return JSON.parse(text);
  } catch {
    try {
      return JSON.parse(sanitize(text));
    } catch {
      throw new AppError("Resposta da IA em formato inválido.", 502, {
        expose: false,
      });
    }
  }
}
