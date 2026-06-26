import { TerminalSquare, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-primary">
            <TerminalSquare size={18} strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-primary">
            SimulaTech
          </span>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-ink-soft">
          <User size={16} />
        </span>
      </div>
    </header>
  );
}
