const ETAPAS = [
  { id: "setup", num: "01", label: "INIT()" },
  { id: "question", num: "02", label: "EXEC()" },
  { id: "feedback", num: "03", label: "DIFF()" },
];

export default function Stepper({ atual }) {
  const indiceAtual = ETAPAS.findIndex((e) => e.id === atual);

  return (
    <div className="mx-auto flex max-w-md items-center px-2">
      {ETAPAS.map((etapa, i) => {
        const concluida = i < indiceAtual;
        const ativa = i === indiceAtual;
        const destacada = concluida || ativa;
        return (
          <div key={etapa.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "grid h-10 w-10 place-items-center rounded-lg border font-mono text-sm font-semibold transition-all",
                  ativa
                    ? "border-primary-btn bg-primary-btn/10 text-primary shadow-glow-indigo"
                    : concluida
                      ? "border-primary-btn/60 bg-surface text-primary"
                      : "border-line bg-surface text-ink-dim",
                ].join(" ")}
              >
                {etapa.num}
              </div>
              <span
                className={[
                  "label-caps",
                  destacada ? "text-ink-soft" : "text-ink-dim",
                ].join(" ")}
              >
                {etapa.label}
              </span>
            </div>
            {i < ETAPAS.length - 1 && (
              <div className="mx-2 mb-5 h-px flex-1 bg-line">
                <div
                  className="h-full bg-primary-btn transition-all duration-500"
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
