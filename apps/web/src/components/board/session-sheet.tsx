import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import type { PlaySession } from "@/lib/board/board.types";

export function SessionSheet({
  open,
  gameTitle,
  onClose,
  onSave,
}: {
  open: boolean;
  gameTitle: string;
  onClose: () => void;
  onSave: (session: PlaySession) => void;
}) {
  const [playedOn, setPlayedOn] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [duration, setDuration] = useState(60);
  const [progress, setProgress] = useState("");
  const [note, setNote] = useState("");
  return (
    <Dialog open={open} onClose={onClose} title="Registrar sessão">
      <p className="text-sm text-(--ink-muted)">{gameTitle}</p>
      <div className="mt-6 grid gap-4">
        <DatePicker
          id="session-played-on"
          label="Data"
          value={playedOn}
          onChange={setPlayedOn}
        />
        <label className="text-sm font-semibold">
          Duração (minutos)
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
            className="mt-2 min-h-12 w-full rounded-xl border border-(--line) bg-(--surface) px-3"
          />
        </label>
        <label className="text-sm font-semibold">
          Progresso (%){" "}
          <span className="font-normal text-(--ink-muted)">opcional</span>
          <input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => setProgress(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-xl border border-(--line) bg-(--surface) px-3"
          />
        </label>
        <label className="text-sm font-semibold">
          Nota <span className="font-normal text-(--ink-muted)">opcional</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-(--line) bg-(--surface) p-3"
          />
        </label>
        <button
          type="button"
          onClick={() => {
            onSave({
              id: `session-${Date.now()}`,
              playedOn,
              durationMinutes: duration,
              progressPercent: progress ? Number(progress) : undefined,
              note: note || undefined,
            });
            onClose();
          }}
          className="min-h-12 rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg)"
        >
          Salvar sessão
        </button>
      </div>
    </Dialog>
  );
}
