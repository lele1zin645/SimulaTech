import {
  validateQuestionInput,
  validateEvaluationInput,
} from "../validators/interview.validator.js";
import {
  generateQuestion,
  evaluateAnswer,
} from "../services/interview.service.js";

export async function postQuestion(req, res) {
  const { cargo, tipo } = validateQuestionInput(req.body);
  const pergunta = await generateQuestion(cargo, tipo);
  res.json({ pergunta });
}

export async function postEvaluation(req, res) {
  const { pergunta, respostaUsuario } = validateEvaluationInput(req.body);
  const avaliacao = await evaluateAnswer(pergunta, respostaUsuario);
  res.json(avaliacao);
}
