import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/env.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import interviewRoutes from "./routes/interview.routes.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: "16kb" }));

  app.get("/", (_req, res) => {
    res.json({ status: "ok", service: "SimulaTech API" });
  });

  app.use("/api", apiRateLimiter, interviewRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
