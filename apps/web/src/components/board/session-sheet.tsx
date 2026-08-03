import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import type { PlaySession } from "@/lib/board/board.types";
import { Clock3, Pause, Play, Square } from "lucide-react";

export function SessionSheet({
  open,
  gameTitle,
  initialSession,
  onClose,
  onSave,
  timerSeconds,
  timerRunning,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onFinishTimer,
  onDiscardTimer,
}: {
  open: boolean;
  gameTitle: string;
  initialSession: PlaySession | null;
  onClose: () => void;
  onSave: (session: PlaySession) => void;
  timerSeconds: number;
  timerRunning: boolean;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResumeTimer: () => void;
  onFinishTimer: () => void;
  onDiscardTimer: () => void;
}) {
  const [playedOn, setPlayedOn] = useState(() =>
    initialSession?.playedOn ?? new Date().toISOString().slice(0, 10),
  );
  const [duration, setDuration] = useState(initialSession?.durationMinutes ?? 60);
  const [progress, setProgress] = useState(
    initialSession?.progressPercent?.toString() ?? "",
  );
  const [note, setNote] = useState(initialSession?.note ?? "");
  const [error, setError] = useState("");
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPlayedOn(
      initialSession?.playedOn ?? new Date().toISOString().slice(0, 10),
    );
    setDuration(initialSession?.durationMinutes ?? 60);
    setProgress(initialSession?.progressPercent?.toString() ?? "");
    setNote(initialSession?.note ?? "");
    setError("");
  }, [initialSession, open]);

  const isEditing = initialSession !== null;
  function handleSave() {
    const normalizedDuration =
      timerSeconds > 0 ? Math.ceil(timerSeconds / 60) : Math.floor(duration);
    const normalizedProgress = progress === "" ? undefined : Number(progress);
    if (!playedOn || normalizedDuration < 1) {
      setError("Informe uma data e uma duração válida.");
      return;
    }
    if (
      normalizedProgress !== undefined &&
      (!Number.isInteger(normalizedProgress) || normalizedProgress < 0 || normalizedProgress > 100)
    ) {
      setError("O progresso deve estar entre 0 e 100%.");
      return;
    }
    onSave({
      id: initialSession?.id ?? `session-${Date.now()}`,
      playedOn,
      durationMinutes: normalizedDuration,
      progressPercent: normalizedProgress,
      note: note.trim() || undefined,
    });
    if (timerSeconds > 0) onFinishTimer();
    onClose();
  }

  function formatTimer(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  function applyTimerDuration() {
    if (timerSeconds === 0) return;
    setDuration(Math.max(1, Math.ceil(timerSeconds / 60)));
    onPauseTimer();
  }

  function handleCloseRequest() {
    if (timerRunning) {
      setCloseConfirmOpen(true);
      return;
    }
    onClose();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseRequest}
        title={isEditing ? "Editar sessão" : "Registrar sessão"}
        description={`${isEditing ? "Edite" : "Registre"} o tempo, progresso e observações da sessão de ${gameTitle}.`}
      >
      <p className="text-sm text-(--ink-muted)">{gameTitle}</p>
      <div className="mt-6 grid gap-5">
        <DatePicker
          id="session-played-on"
          label="Data"
          value={playedOn}
          onChange={setPlayedOn}
        />
        <div>
          <label className="text-sm font-semibold" htmlFor="session-duration">
            Duração (minutos)
          </label>
          <input
            id="session-duration"
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value) || 0)}
            className="mt-2 min-h-12 w-full rounded-xl border border-(--line) bg-(--surface) px-3 text-(--ink) outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          />
          <span className="mt-1 block text-xs font-normal text-(--ink-muted)">
            Quanto tempo você jogou nessa sessão?
          </span>
          <div className="mt-3 rounded-2xl border border-(--line) bg-(--surface-muted)/45 p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock3 aria-hidden="true" size={16} className="text-(--accent)" />
                Cronômetro
              </div>
              <span className="font-mono text-lg tabular-nums text-(--ink)">
                {formatTimer(timerSeconds)}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {!timerRunning ? (
                <button
                  type="button"
                  onClick={timerSeconds > 0 ? onResumeTimer : onStartTimer}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-(--action-bg) px-4 text-sm font-semibold text-(--action-fg)"
                >
                  <Play aria-hidden="true" size={15} />
                  {timerSeconds > 0 ? "Continuar" : "Começar a contar"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onPauseTimer}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-(--line) px-4 text-sm font-semibold hover:bg-(--surface-muted)"
                >
                  <Pause aria-hidden="true" size={15} />
                  Pausar
                </button>
              )}
              {timerSeconds > 0 && (
                <button
                  type="button"
                  onClick={applyTimerDuration}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-(--line) px-4 text-sm font-semibold hover:bg-(--surface-muted)"
                >
                  <Square aria-hidden="true" size={14} />
                  Usar este tempo
                </button>
              )}
            </div>
            <p className="mt-2 text-xs leading-5 text-(--ink-muted)">
              Use o cronômetro enquanto joga. Ao aplicar, arredondamos para o minuto mais próximo.
            </p>
          </div>
        </div>
        <label className="text-sm font-semibold">
          Progresso (%){" "}
          <span className="font-normal text-(--ink-muted)">opcional</span>
          <input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => setProgress(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-xl border border-(--line) bg-(--surface) px-3 text-(--ink) outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          />
          <span className="mt-1 block text-xs font-normal text-(--ink-muted)">
            Ajuda a acompanhar até onde você chegou.
          </span>
        </label>
        <label className="text-sm font-semibold">
          Nota <span className="font-normal text-(--ink-muted)">opcional</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="O que marcou essa sessão?"
            className="mt-2 w-full rounded-xl border border-(--line) bg-(--surface) p-3 text-(--ink) outline-none placeholder:text-(--ink-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          />
        </label>
        {error && <p className="text-sm text-(--accent)">{error}</p>}
        <button
          type="button"
          onClick={handleSave}
          className="min-h-12 rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg)"
        >
          {isEditing ? "Salvar alterações" : "Salvar sessão"}
        </button>
      </div>
      </Dialog>
      <Dialog
        open={closeConfirmOpen}
        onClose={() => setCloseConfirmOpen(false)}
        title="Cronômetro em andamento"
        description="Escolha o que fazer com o tempo contado antes de fechar o formulário."
      >
      <p className="text-sm leading-6 text-(--ink-muted)">
        O tempo desta sessão continuará contando se você mantiver o cronômetro em segundo plano.
      </p>
      <div className="mt-7 grid gap-2">
        <button
          type="button"
          onClick={() => {
            setCloseConfirmOpen(false);
            onClose();
          }}
          className="min-h-11 rounded-full bg-(--action-bg) px-4 text-sm font-semibold text-(--action-fg)"
        >
          Continuar em segundo plano
        </button>
        <button
          type="button"
          onClick={() => {
            onPauseTimer();
            setCloseConfirmOpen(false);
            onClose();
          }}
          className="min-h-11 rounded-full border border-(--line) px-4 text-sm font-semibold hover:bg-(--surface-muted)"
        >
          Pausar e fechar
        </button>
        <button
          type="button"
          onClick={() => {
            onDiscardTimer();
            setCloseConfirmOpen(false);
            onClose();
          }}
          className="min-h-11 rounded-full border border-(--line) px-4 text-sm font-semibold text-(--accent) hover:bg-(--surface-muted)"
        >
          Descartar tempo
        </button>
      </div>
      </Dialog>
    </>
  );
}
