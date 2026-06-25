import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

const { apiKey, model, baseUrl, timeoutMs } = config.openRouter;

export async function createChatCompletion(messages, options = {}) {
  const { temperature = 0.7, json = false } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const payload = {
    model,
    messages,
    temperature,
    ...(json ? { response_format: { type: "json_object" } } : {}),
  };

  let response;
  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": config.corsOrigin,
        "X-Title": "SimulaTech",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new AppError(
        "O serviço de IA demorou para responder. Tente novamente.",
        504
      );
    }
    throw new AppError("Falha de conexão com o serviço de IA.", 502);
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 429) {
    throw new AppError(
      "O serviço de IA está com alta demanda. Aguarde alguns segundos e tente novamente.",
      429
    );
  }

  if (!response.ok) {
    throw new AppError("O serviço de IA retornou um erro.", 502, {
      expose: false,
    });
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new AppError("O serviço de IA retornou uma resposta vazia.", 502);
  }

  return content;
}
