import { useState, useEffect, useRef } from "react";
import { Send, Lightbulb, Gauge, Loader2, MoreHorizontal, TerminalSquare } from "lucide-react";

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

  useEffect(() => {
    setSegundos(0);
    setResposta("");
    const intervalo = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(intervalo);
  }, [pergunta]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.max(el.scrollHeight, 200) + "px";
    }
  }, [resposta]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");
  const podeEnviar = resposta.trim().length > 0 && !carregando;

  return (
    <div className="fade-up space-y-5">
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-low px-4 py-2.5">
          <span className="label-caps text-ink-dim">
            Questão {numero} de {total}
            {categoria && <span className="text-cyan"> · {categoria}</span>}
          </span>
          <MoreHorizontal size={18} className="text-ink-dim" />
        </div>
        <h2 className="px-6 py-5 text-2xl font-semibold leading-snug text-ink">
          {pergunta}
        </h2>
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line bg-surface-low px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose/80" />
            <span className="h-3 w-3 rounded-full bg-amber/80" />
            <span className="h-3 w-3 rounded-full bg-[#7ee787]/80" />
          </span>
          <span className="ml-2 font-mono text-xs text-ink-dim">
            response_buffer.tsx
          </span>
        </div>
        <div className="grid-bg">
          <textarea
            ref={textareaRef}
            value={resposta}
            onChange={(e) => setResposta(e.target.value.slice(0, MAX_CARACTERES))}
            placeholder="// Digite sua resposta técnica aqui..."
            disabled={carregando}
            className="w-full resize-none bg-transparent px-4 py-4 font-mono text-sm text-ink outline-none placeholder:text-ink-dim/70 disabled:opacity-60"
            style={{ minHeight: 200 }}
          />
          <div className="px-4 pb-2 text-right font-mono text-xs text-ink-dim">
            {resposta.length} / {MAX_CARACTERES} chars
          </div>
        </div>
      </div>

      <p className="flex items-center gap-2 px-1 font-mono text-xs text-ink-dim">
        <TerminalSquare size={15} className="shrink-0 text-cyan" />
        Motor de análise por IA ativo · verificação de profundidade habilitada
      </p>

      {erro && (
        <p className="rounded-lg border border-rose/30 bg-rose/10 px-3 py-2 text-sm text-rose">
          {erro}
        </p>
      )}

      <button
        onClick={() => onEnviar(resposta)}
        disabled={!podeEnviar}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-btn py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-white transition hover:shadow-glow-indigo disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
      >
        {carregando ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Avaliando resposta
          </>
        ) : (
          <>
            Enviar resposta
            <Send size={16} />
          </>
        )}
      </button>

      <div className="panel p-5">
        <h3 className="flex items-center gap-2 label-caps text-primary">
          <Lightbulb size={16} />
          Documentation Snippet
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          <span className="font-mono text-cyan">@dica:</span> estruture a resposta
          com começo, meio e fim — contextualize o problema, explique o raciocínio
          e finalize com um exemplo. Em questões técnicas, citar{" "}
          <code className="rounded border border-line/70 bg-surface-lowest px-1 py-0.5 font-mono text-xs text-cyan">
            trade-offs
          </code>{" "}
          costuma impressionar.
        </p>
      </div>

      <div className="panel grid-bg p-6 text-center">
        <Gauge size={26} className="mx-auto text-cyan" />
        <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-cyan">
          {mm}:{ss}
        </p>
        <p className="mt-1 label-caps text-ink-dim">Tempo decorrido</p>
      </div>
    </div>
  );
}
