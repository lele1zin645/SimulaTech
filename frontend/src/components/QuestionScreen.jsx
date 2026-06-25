import { useState, useEffect, useRef } from "react";
import { Send, Info, Lightbulb, Timer, Loader2 } from "lucide-react";

const MAX_CARACTERES = 2000;

export default function QuestionScreen({
  pergunta,
  numero,
  total,
  categoria,
  onEnviar,
  carregando,
  erro,
}) {
  const [resposta, setResposta] = useState("");
  const [segundos, setSegundos] = useState(0);
  const textareaRef = useRef(null);

  // Cronômetro de tempo decorrido na questão atual.
  useEffect(() => {
    setSegundos(0);
    setResposta("");
    const intervalo = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(intervalo);
  }, [pergunta]);

  // Textarea que cresce conforme o usuário digita.
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.max(el.scrollHeight, 160) + "px";
    }
  }, [resposta]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");
  const podeEnviar = resposta.trim().length > 0 && !carregando;

  return (
    <div className="fade-up space-y-5">
      {/* Card da pergunta */}
      <div className="rounded-xl bg-surface-card p-6 shadow-soft">
        <p className="text-sm font-semibold text-primary">
          Questão {numero} de {total}
          {categoria && (
            <span className="text-ink-soft"> · {categoria}</span>
          )}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-snug text-ink">
          {pergunta}
        </h2>
      </div>

      {/* Área de resposta */}
      <div className="rounded-xl bg-surface-card p-4 shadow-soft">
        <textarea
          ref={textareaRef}
          value={resposta}
          onChange={(e) =>
            setResposta(e.target.value.slice(0, MAX_CARACTERES))
          }
          placeholder="Digite sua resposta detalhada aqui..."
          disabled={carregando}
          className="w-full resize-none bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/70 disabled:opacity-60"
          style={{ minHeight: 160 }}
        />
        <div className="mt-1 text-right text-sm text-ink-soft">
          {resposta.length} / {MAX_CARACTERES} caracteres
        </div>
      </div>

      <p className="flex items-center gap-2 px-1 text-sm text-ink-soft">
        <Info size={16} className="shrink-0 text-primary" />
        Sua resposta será analisada por nossa IA especializada.
      </p>

      {erro && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {erro}
        </p>
      )}

      <button
        onClick={() => onEnviar(resposta)}
        disabled={!podeEnviar}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-semibold text-white shadow-lift transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        {carregando ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Avaliando sua resposta...
          </>
        ) : (
          <>
            Enviar resposta
            <Send size={18} />
          </>
        )}
      </button>

      {/* Dica de especialista */}
      <div className="rounded-xl bg-surface-muted p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Lightbulb size={20} />
          Dica de Especialista
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Estruture sua resposta com começo, meio e fim: contextualize o
          problema, explique seu raciocínio e finalize com um exemplo concreto.
          Em questões técnicas, mencionar trade-offs costuma impressionar.
        </p>
      </div>

      {/* Cronômetro */}
      <div className="rounded-xl bg-gradient-to-br from-primary-light to-primary p-6 text-center text-white">
        <Timer size={28} className="mx-auto" />
        <p className="mt-2 font-mono text-3xl font-semibold tabular-nums">
          {mm}:{ss}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/80">
          Tempo decorrido
        </p>
      </div>
    </div>
  );
}
