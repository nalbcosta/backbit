import { Pause, Play, Square, Timer } from "lucide-react";

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function SessionTimerPlayer({
  gameTitle,
  seconds,
  running,
  onPause,
  onResume,
  onFinish,
  onDiscard,
}: {
  gameTitle: string;
  seconds: number;
  running: boolean;
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom))] left-4 right-4 z-40 rounded-2xl border border-(--line) bg-(--surface) p-3 shadow-xl md:bottom-5 md:left-auto md:right-5 md:w-96">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-(--surface-muted) text-(--accent)">
          <Timer aria-hidden="true" size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{gameTitle}</p>
          <p className="mt-1 font-mono text-sm tabular-nums text-(--ink-muted)">
            {formatTimer(seconds)}
          </p>
        </div>
        <button
          type="button"
          onClick={running ? onPause : onResume}
          aria-label={running ? "Pausar cronômetro" : "Continuar cronômetro"}
          className="inline-flex size-9 items-center justify-center rounded-full hover:bg-(--surface-muted)"
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onFinish}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full bg-(--action-bg) px-3 text-sm font-semibold text-(--action-fg)"
        >
          <Square aria-hidden="true" size={14} />
          Finalizar sessão
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="min-h-10 rounded-full border border-(--line) px-3 text-sm font-semibold text-(--ink-muted) hover:bg-(--surface-muted)"
        >
          Descartar
        </button>
      </div>
    </div>
  );
}
