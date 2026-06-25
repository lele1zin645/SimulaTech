import { createChatCompletion } from "./openrouter.service.js";
import { parseJsonObject } from "../utils/json.js";
import { AppError } from "../utils/AppError.js";

const MAX_EVALUATION_ATTEMPTS = 3;

const QUESTION_STYLES = {
  rh: "uma pergunta comportamental de RH (soft skills, motivação, trabalho em equipe, resolução de conflitos)",
  tecnica: "uma pergunta técnica desafiadora, porém adequada ao nível da vaga",
};

const QUESTION_SYSTEM_PROMPT =
  "Você é um recrutador técnico experiente conduzindo uma entrevista de emprego. " +
  "Faça perguntas claras, realistas e relevantes para a vaga. " +
  "Responda APENAS com o texto da pergunta, sem numeração, sem aspas, " +
  "sem saudações e sem nenhum comentário adicional.";

const EVALUATION_SYSTEM_PROMPT =
  "Você é um avaliador técnico de entrevistas, rigoroso porém construtivo. " +
  "Avalie a resposta do candidato à pergunta dada.\n\n" +
  "REGRAS DE SAÍDA (obrigatórias):\n" +
  "- Responda com UM ÚNICO objeto JSON válido e nada mais.\n" +
  "- NÃO use cercas de código markdown.\n" +
  "- NÃO escreva texto antes ou depois do objeto.\n" +
  "- NÃO use comentários nem vírgula sobrando.\n\n" +
  "O objeto deve ter exatamente estas três chaves:\n" +
  '- "nota": número de 0 a 10 (pode ter casa decimal).\n' +
  '- "feedback": string em português com pontos fortes e pontos a melhorar.\n' +
  '- "resposta_ideal": string em português com uma resposta modelo. ' +
  "Se a pergunta for técnica e fizer sentido, inclua exemplos de código em markdown.\n\n" +
  'Formato esperado: {"nota": 7.5, "feedback": "...", "resposta_ideal": "..."}';

export async function generateQuestion(cargo, tipo) {
  const estilo = QUESTION_STYLES[tipo] ?? QUESTION_STYLES.tecnica;

  const content = await createChatCompletion(
    [
      { role: "system", content: QUESTION_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Vaga: ${cargo}.\nGere ${estilo} para essa vaga. Devolva somente a pergunta, em português do Brasil.`,
      },
    ],
    { temperature: 0.9 }
  );

  return content.replace(/^["'\s]+|["'\s]+$/g, "");
}

export async function evaluateAnswer(pergunta, respostaUsuario) {
  const messages = [
    { role: "system", content: EVALUATION_SYSTEM_PROMPT },
    {
      role: "user",
      content: `Pergunta da entrevista:\n${pergunta}\n\nResposta do candidato:\n${respostaUsuario}\n\nAvalie e devolva somente o objeto JSON conforme as instruções.`,
    },
  ];

  const data = await requestEvaluationWithRetry(messages);
  return normalizeEvaluation(data);
}

async function requestEvaluationWithRetry(messages) {
  let lastError;

  for (let attempt = 1; attempt <= MAX_EVALUATION_ATTEMPTS; attempt++) {
    try {
      const content = await createChatCompletion(messages, {
        temperature: 0.3,
        json: true,
      });
      return parseJsonObject(content);
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 429) throw error;
      lastError = error;
    }
  }

  throw lastError ?? new AppError("Não foi possível avaliar a resposta.", 502);
}

function normalizeEvaluation(data) {
  const nota = Math.min(10, Math.max(0, Number(data.nota) || 0));

  return {
    nota,
    feedback: String(data.feedback ?? "Sem feedback."),
    resposta_ideal: String(data.resposta_ideal ?? ""),
  };
}
