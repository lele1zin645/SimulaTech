import { useState } from "react";
import {
  SlidersHorizontal,
  Rocket,
  Clock,
  Gauge,
  Code2,
  BarChart3,
  TrendingUp,
  Loader2,
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
    titulo: "Feedback em Tempo Real",
    texto:
      "Receba sugestões de melhoria enquanto codifica ou responde perguntas técnicas.",
  },
  {
    icon: BarChart3,
    titulo: "Relatórios Detalhados",
    texto:
      "Análise completa da sua performance após cada sessão de entrevista simulada.",
  },
  {
    icon: TrendingUp,
    titulo: "Evolução de Carreira",
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
      {/* Hero */}
      <div className="pt-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          SimulaTech
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-ink-soft sm:text-lg">
          Treine suas habilidades para sua próxima grande oportunidade.
        </p>
      </div>

      {/* Card de configuração */}
      <div className="rounded-xl bg-surface-card p-6 shadow-soft sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-white">
            <SlidersHorizontal size={22} />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Configurar Simulação
            </h2>
            <p className="mt-0.5 text-sm text-ink-soft">
              Personalize sua experiência de treino
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
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

        {erro && (
          <p className="mt-5 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {erro}
          </p>
        )}

        <button
          onClick={() => onIniciar(cargo, tipo)}
          disabled={!podeIniciar}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-semibold text-white shadow-lift transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {carregando ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Gerando pergunta...
            </>
          ) : (
            <>
              Iniciar simulação
              <Rocket size={20} />
            </>
          )}
        </button>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Chip icon={Clock} texto="~25 min" />
          <Chip icon={Gauge} texto="Nível Adaptativo" />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        {FEATURES.map((f) => (
          <div
            key={f.titulo}
            className="rounded-xl bg-surface-card p-5 shadow-soft"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface-muted text-primary">
              <f.icon size={20} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{f.titulo}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
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
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">
        {label}
      </span>
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
          "w-full appearance-none rounded-lg border border-surface-ring bg-white px-4 py-3 pr-10 text-sm outline-none transition",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          value ? "text-ink" : "text-ink-soft",
        ].join(" ")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val} className="text-ink">
              {lbl}
            </option>
          );
        })}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function Chip({ icon: Icon, texto }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink-soft">
      <Icon size={14} className="text-primary" />
      {texto}
    </span>
  );
}
