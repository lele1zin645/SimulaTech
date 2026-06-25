import { config, getMissingConfig } from "./src/config/env.js";
import { createApp } from "./src/app.js";

const missing = getMissingConfig();
if (missing.length > 0) {
  console.error(`Configuração inválida. Variáveis ausentes: ${missing.join(", ")}`);
  console.error("Crie um arquivo .env a partir de .env.example.");
  process.exit(1);
}

const app = createApp();

app.listen(config.port, () => {
  console.log(
    `SimulaTech API em http://localhost:${config.port} [${config.nodeEnv}]`
  );
});
