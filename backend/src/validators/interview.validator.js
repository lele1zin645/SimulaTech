import { AppError } from "../utils/AppError.js";

const TIPOS_VALIDOS = ["tecnica", "rh"];
const LIMITES = { cargo: 120, pergunta: 2000, resposta: 5000 };

function texto(valor) {
  return String(valor ?? "").trim();
}

export function validateQuestionInput(body) {
  const cargo = texto(body?.cargo);
  const tipo = texto(body?.tipo).toLowerCase();

  if (!cargo || !tipo) {
    throw new AppError('Informe "cargo" e "tipo".', 400);
  }
  if (cargo.length > LIMITES.cargo) {
    throw new AppError("O campo cargo é muito longo.", 400);
  }
  if (!TIPOS_VALIDOS.includes(tipo)) {
    throw new AppError('Tipo inválido. Use "tecnica" ou "rh".', 400);
  }

  return { cargo, tipo };
}

export function validateEvaluationInput(body) {
  const pergunta = texto(body?.pergunta);
  const respostaUsuario = texto(body?.respostaUsuario);

  if (!pergunta || !respostaUsuario) {
    throw new AppError('Informe "pergunta" e "respostaUsuario".', 400);
  }
  if (pergunta.length > LIMITES.pergunta) {
    throw new AppError("A pergunta é muito longa.", 400);
  }
  if (respostaUsuario.length > LIMITES.resposta) {
    throw new AppError("A resposta é muito longa.", 400);
  }

  return { pergunta, respostaUsuario };
}
