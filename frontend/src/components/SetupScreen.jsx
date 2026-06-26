import { useState } from "react";
import {
  TerminalSquare,
  Rocket,
  Clock,
  Gauge,
  Code2,
  BarChart3,
  TrendingUp,
  Loader2,
  ChevronsUpDown,
} from "lucide-react";

const CARGOS = [
  "Desenvolvedor Front-end React",
  "Desenvolvedor Back-end Node.js",
  "Desenvolvedor Full Stack",
  "Desenvolvedor Mobile (React Native)",
  "Engenheiro de Dados",
  "Desenvolvedor Python",
  "DevOps / SRE",
];

const FEATURES = [
  {
    icon: Code2,
    titulo: "FEEDBACK EM TEMPO REAL",
    texto:
      "Receba sugestões de melhoria enquanto codifica ou responde perguntas técnicas.",
  },
  {
    icon: BarChart3,
    titulo: "RELATÓRIOS DETALHADOS",
    texto:
      "Análise completa da sua performance após cada sessão de entrevista simulada.",
  },
  {
    icon: TrendingUp,
    titulo: "EVOLUÇÃO DE CARREIRA",
    texto:
      "Acompanhe seu progresso e identifique áreas que precisam de mais estudo.",
  },
];

export default function SetupScreen({ onIniciar, carregando, erro }) {
  const [cargo, setCargo] = useState("");
  const [tipo, setTipo] = useState("");
  const podeIniciar = cargo && tipo && !carregando;

  return (
    <div className="fade-up space-y-10">
      <div className="pt-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-ink">
          SimulaTech
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-ink-soft sm:text-lg">
          Treine suas habilidades para sua próxima grande oportunidade.
        </p>
      </div>

      <div className="panel p-6 shadow-glow-indigo/0 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-line bg-surface-high text-primary">
            <TerminalSquare size={22} />
          </span>
          <div>
            <h2 className="font-mono text-xl font-bold uppercase tracking-wide text-ink">
              Configurar Simulação
            </h2>
            <p className="mt-1 label-caps text-cyan">
              Personalize sua experiência de treino
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <Campo label="Vaga pretendida">
            <Select
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Selecione o cargo"
              options={CARGOS}
            />
          </Campo>
          <Campo label="Tipo de entrevista">
            <Select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Selecione o tipo"
              options={[
                { value: "tecnica", label: "Técnica" },
                { value: "rh", label: "RH / Comportamental" },
              ]}
            />
          </Campo>
        </div>

        <div className="mt-6 flex gap-1.5">
          <span className="h-1 flex-1 rounded-full bg-cyan shadow-glow-cyan" />
          <span className="h-1 flex-1 rounded-full bg-line" />
          <span className="h-1 flex-1 rounded-full bg-line" />
        </div>

        {erro && (
          <p className="mt-5 rounded-lg border border-rose/30 bg-rose/10 px-3 py-2 text-sm text-rose">
            {erro}
          </p>
        )}

        <button
          onClick={() => onIniciar(cargo, tipo)}
          disabled={!podeIniciar}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-btn py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-white transition hover:shadow-glow-indigo disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
        >
          {carregando ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Gerando pergunta
            </>
          ) : (
            <>
              Iniciar simulação
              <Rocket size={18} />
            </>
          )}
        </button>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Chip icon={Clock} texto="~25 min" />
          <Chip icon={Gauge} texto="Nível Adaptativo" />
        </div>
      </div>

      <div className="space-y-4">
        {FEATURES.map((f) => (
          <div
            key={f.titulo}
            className="panel p-5 transition-colors hover:border-line-strong"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface-high text-primary">
              <f.icon size={20} />
            </span>
            <h3 className="mt-4 label-caps text-base text-ink">{f.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {f.texto}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Campo({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block label-caps text-ink-dim">{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, placeholder, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={[
          "w-full appearance-none rounded-lg border border-line bg-surface-lowest px-4 py-3 pr-10 font-mono text-sm outline-none transition",
          "focus:border-primary-btn focus:shadow-glow-indigo",
          value ? "text-ink" : "text-ink-dim",
        ].join(" ")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val} className="bg-surface text-ink">
              {lbl}
            </option>
          );
        })}
      </select>
      <ChevronsUpDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-dim"
      />
    </div>
  );
}

function Chip({ icon: Icon, texto }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 label-caps text-ink-soft">
      <Icon size={13} className="text-cyan" />
      {texto}
    </span>
  );
}
