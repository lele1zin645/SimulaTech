import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import {
  MessageSquareText,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

/** Define a cor e o rótulo conforme a nota (0 a 10). */
function classificar(nota) {
  if (nota >= 7)
    return { cor: "#10b981", bg: "bg-emerald-50", texto: "text-emerald-700", rotulo: "Bom desempenho" };
  if (nota >= 5)
    return { cor: "#f59e0b", bg: "bg-amber-50", texto: "text-amber-700", rotulo: "Pode melhorar" };
  return { cor: "#f43f5e", bg: "bg-rose-50", texto: "text-rose-700", rotulo: "Precisa de atenção" };
}

/** Anel circular de progresso mostrando a nota. */
function AnelNota({ nota }) {
  const { cor, rotulo, bg, texto } = classificar(nota);
  const raio = 52;
  const circunferencia = 2 * Math.PI * raio;
  const preenchido = (nota / 10) * circunferencia;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={raio}
            fill="none"
            stroke="#e5eeff"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={raio}
            fill="none"
            stroke={cor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${preenchido} ${circunferencia}`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-ink">
            {nota.toFixed(1)}
          </span>
          <span className="text-xs font-medium text-ink-soft">de 10</span>
        </div>
      </div>
      <span
        className={`mt-3 rounded-full px-3 py-1 text-sm font-semibold ${bg} ${texto}`}
      >
        {rotulo}
      </span>
    </div>
  );
}

export default function FeedbackScreen({ feedback, onProxima, carregando }) {
  const { nota, feedback: textoFeedback, resposta_ideal } = feedback;
  const [copiado, setCopiado] = useState(false);

  // Extrai o primeiro bloco de código da resposta ideal (se houver).
  function copiarCodigo() {
    const match = resposta_ideal.match(/```[a-z]*\n([\s\S]*?)```/i);
    const conteudo = match ? match[1].trim() : resposta_ideal;
    navigator.clipboard?.writeText(conteudo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  const temCodigo = /```/.test(resposta_ideal);

  return (
    <div className="fade-up space-y-5">
      {/* Card da nota */}
      <div className="rounded-xl bg-surface-card p-6 text-center shadow-soft">
        <AnelNota nota={nota} />
      </div>

      {/* Feedback detalhado */}
      <div className="rounded-xl bg-surface-card p-6 shadow-soft">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <MessageSquareText size={20} className="text-primary" />
          Feedback Detalhado
        </h3>
        <div className="markdown mt-3 text-sm text-ink-soft sm:text-base">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {textoFeedback}
          </ReactMarkdown>
        </div>
      </div>

      {/* Resposta ideal */}
      <div className="rounded-xl bg-surface-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
            <Sparkles size={20} className="text-primary" />
            Resposta Ideal
          </h3>
          {temCodigo && (
            <button
              onClick={copiarCodigo}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary transition hover:bg-surface-muted"
            >
              {copiado ? (
                <>
                  <Check size={15} /> Copiado
                </>
              ) : (
                <>
                  <Copy size={15} /> Copiar código
                </>
              )}
            </button>
          )}
        </div>
        <div className="markdown mt-3 text-sm text-ink-soft sm:text-base">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {resposta_ideal}
          </ReactMarkdown>
        </div>
      </div>

      {/* Próxima pergunta */}
      <button
        onClick={onProxima}
        disabled={carregando}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary-light to-primary py-4 font-semibold text-white shadow-lift transition hover:opacity-95 disabled:opacity-60"
      >
        {carregando ? "Gerando próxima..." : "Próxima pergunta"}
        {!carregando && <ArrowRight size={18} />}
      </button>
    </div>
  );
}
