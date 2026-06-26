import { useState } from "react";
import { gerarPergunta, avaliarResposta } from "./api";
import Header from "./components/Header";
import Stepper from "./components/Stepper";
import SetupScreen from "./components/SetupScreen";
import QuestionScreen from "./components/QuestionScreen";
import FeedbackScreen from "./components/FeedbackScreen";

const TOTAL_QUESTOES = 8;

export default function App() {
  const [tela, setTela] = useState("setup");
  const [config, setConfig] = useState({ cargo: "", tipo: "" });
  const [pergunta, setPergunta] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [numeroQuestao, setNumeroQuestao] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function iniciar(cargo, tipo) {
    setErro("");
    setCarregando(true);
    try {
      const { pergunta } = await gerarPergunta(cargo, tipo);
      setConfig({ cargo, tipo });
      setPergunta(pergunta);
      setNumeroQuestao(1);
      setTela("question");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function enviar(resposta) {
    setErro("");
    setCarregando(true);
    try {
      const resultado = await avaliarResposta(pergunta, resposta);
      setFeedback(resultado);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTela("feedback");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function proxima() {
    setErro("");
    setCarregando(true);
    try {
      const { pergunta } = await gerarPergunta(config.cargo, config.tipo);
      setPergunta(pergunta);
      setFeedback(null);
      setNumeroQuestao((n) => Math.min(n + 1, TOTAL_QUESTOES));
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTela("question");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  const categoria = config.tipo === "rh" ? "Comportamental" : "Técnica";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {tela !== "setup" && (
          <div className="mb-8">
            <Stepper atual={tela} />
          </div>
        )}

        {tela === "setup" && (
          <SetupScreen onIniciar={iniciar} carregando={carregando} erro={erro} />
        )}

        {tela === "question" && (
          <QuestionScreen
            pergunta={pergunta}
            numero={numeroQuestao}
            total={TOTAL_QUESTOES}
            categoria={categoria}
            onEnviar={enviar}
            carregando={carregando}
            erro={erro}
          />
        )}

        {tela === "feedback" && feedback && (
          <FeedbackScreen
            feedback={feedback}
            onProxima={proxima}
            carregando={carregando}
          />
        )}
      </main>

      <footer className="border-t border-line/60 px-4 py-8 text-center">
        <p className="label-caps text-ink">SimulaTech Engineering</p>
        <p className="mt-1.5 font-mono text-xs text-ink-dim">
          © 2026 SimulaTech. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
