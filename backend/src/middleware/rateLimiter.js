import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    erro: "Muitas requisições em pouco tempo. Aguarde um momento e tente novamente.",
  },
});
