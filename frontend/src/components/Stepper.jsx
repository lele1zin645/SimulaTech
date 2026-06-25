import { Check } from "lucide-react";

/**
 * Stepper horizontal das etapas da simulação.
 * @param {{ atual: "setup" | "question" | "feedback" }} props
 */
export default function Stepper({ atual }) {
  const etapas = [
    { id: "setup", label: "Intro" },
    { id: "question", label: "Questões" },
    { id: "feedback", label: "Review" },
  ];
  const indiceAtual = etapas.findIndex((e) => e.id === atual);

  return (
    <div className="mx-auto flex max-w-md items-center px-2">
      {etapas.map((etapa, i) => {
        const concluida = i < indiceAtual;
        const ativa = i === indiceAtual;
        return (
          <div key={etapa.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-colors",
                  concluida
                    ? "bg-primary text-white"
                    : ativa
                      ? "bg-primary text-white ring-4 ring-primary/15"
                      : "bg-surface-ring text-ink-soft",
                ].join(" ")}
              >
                {concluida ? <Check size={16} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={[
                  "text-xs font-medium",
                  ativa || concluida ? "text-ink" : "text-ink-soft",
                ].join(" ")}
              >
                {etapa.label}
              </span>
            </div>
            {i < etapas.length - 1 && (
              <div className="mx-1 mb-5 h-0.5 flex-1 rounded-full bg-surface-ring">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: concluida ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
