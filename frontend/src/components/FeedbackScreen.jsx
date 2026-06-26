import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { BarChart3, Sparkles, Copy, Check, ArrowRight } from "lucide-react";

function classificar(nota) {
  if (nota >= 7)
    return {
      cor: "#7ee787",
      glow: "shadow-glow-green",
      texto: "text-[#7ee787]",
      borda: "border-[#7ee787]/40",
      rotulo: "Desempenho Pro Dev",
    };
  if (nota >= 5)
    return {
      cor: "#f7bd3e",
      glow: "shadow-glow-amber",
      texto: "text-amber",
      borda: "border-amber/40",
      rotulo: "Bom Progresso",
    };
  return {
    cor: "#ffb4ab",
    glow: "shadow-glow-rose",
    texto: "text-rose",
    borda: "border-rose/40",
    rotulo: "Precisa Evoluir",
  };
}

function AnelNota({ nota }) {
  const { cor, glow, texto, borda, rotulo } = classificar(nota);
  const raio = 52;
  const circ = 2 * Math.PI * raio;
  const preenchido = (nota / 10) * circ;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative h-36 w-36 rounded-full ${glow}`}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={raio} fill="none" stroke="#34343b" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={raio}
            fill="none"
            stroke={cor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${preenchido} ${circ}`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold text-ink">
            {nota.toFixed(1)}
          </span>
          <span className="label-caps text-ink-dim">grade</span>
        </div>
      </div>
      <span
        className={`mt-4 rounded-full border ${borda} bg-surface px-3 py-1 label-caps ${texto}`}
      >
        {rotulo}
      </span>
    </div>
  );
}

export default function FeedbackScreen({ feedback, onProxima, carregando }) {
  const { nota, feedback: textoFeedback, resposta_ideal } = feedback;
  const [copiado, setCopiado] = useState(false);
  const temCodigo = /```/.test(resposta_ideal);

  function copiarCodigo() {
    const match = resposta_ideal.match(/```[a-z]*\n([\s\S]*?)```/i);
    const conteudo = match ? match[1].trim() : resposta_ideal;
    navigator.clipboard?.writeText(conteudo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="fade-up space-y-5">
      <div className="panel p-6 text-center">
        <AnelNota nota={nota} />
      </div>

      <div className="panel p-6">
        <h3 className="flex items-center gap-2 label-caps text-primary">
          <BarChart3 size={16} />
          Technical Analysis
        </h3>
        <div className="markdown mt-4 text-sm text-ink-soft sm:text-base">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {textoFeedback}
          </ReactMarkdown>
        </div>
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-line bg-surface-low px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose/80" />
              <span className="h-3 w-3 rounded-full bg-amber/80" />
              <span className="h-3 w-3 rounded-full bg-[#7ee787]/80" />
            </span>
            <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-ink-dim">
              <Sparkles size={13} className="text-primary" />
              resposta_ideal
            </span>
          </div>
          {temCodigo && (
            <button
              onClick={copiarCodigo}
              className="flex items-center gap-1.5 rounded label-caps text-cyan transition hover:text-ink"
            >
              {copiado ? (
                <>
                  <Check size={13} /> Copiado
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy Code
                </>
              )}
            </button>
          )}
        </div>
        <div className="markdown px-5 py-4 text-sm text-ink-soft sm:text-base">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {resposta_ideal}
          </ReactMarkdown>
        </div>
      </div>

      <button
        onClick={onProxima}
        disabled={carregando}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-btn py-4 font-mono text-sm font-bold uppercase tracking-wider text-white transition hover:shadow-glow-indigo disabled:opacity-50"
      >
        {carregando ? "Gerando próxima" : "Próxima pergunta"}
        {!carregando && <ArrowRight size={16} />}
      </button>
    </div>
  );
}
