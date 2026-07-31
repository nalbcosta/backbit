import { AppShell } from "@/components/app/app-shell";
import { BoardShell } from "@/components/board/board-shell";

export default function BoardPage() {
  return (
    <AppShell>
      <BoardShell />
    </AppShell>
  );
}
