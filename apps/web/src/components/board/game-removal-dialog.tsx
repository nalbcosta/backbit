import { Dialog } from "@/components/ui/dialog";

export function GameRemovalDialog({
  gameTitle,
  open,
  onClose,
  onConfirm,
}: {
  gameTitle: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} title="Remover jogo?" description={`Confirmação para remover ${gameTitle} do Kanban.`}>
      <p className="text-sm leading-6 text-(--ink-muted)">
        Tem certeza que deseja remover <strong className="text-(--ink)">{gameTitle}</strong> do seu Kanban?
      </p>
      <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className="min-h-11 rounded-full border border-(--line) px-4 text-sm font-semibold hover:bg-(--surface-muted)">
          Cancelar
        </button>
        <button type="button" onClick={onConfirm} className="min-h-11 rounded-full bg-(--accent) px-4 text-sm font-semibold text-(--accent-ink)">
          Remover
        </button>
      </div>
    </Dialog>
  );
}
