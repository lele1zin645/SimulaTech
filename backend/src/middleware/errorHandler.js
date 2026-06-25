import { AppError } from "../utils/AppError.js";

export function errorHandler(error, req, res, _next) {
  const isAppError = error instanceof AppError;
  const statusCode = isAppError ? error.statusCode : 500;
  const expose = isAppError ? error.expose : false;

  if (statusCode >= 500) {
    console.error(`[${req.method} ${req.originalUrl}]`, error.message);
  }

  const message = expose ? error.message : "Erro interno do servidor.";
  res.status(statusCode).json({ erro: message });
}
