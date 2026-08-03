"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";

import { AddGameSheet } from "@/components/board/add-game-sheet";
import { BoardGrid } from "@/components/board/board-grid";
import { BoardHeader } from "@/components/board/board-header";
import { BoardList } from "@/components/board/board-list";
import { BoardMobileSwitcher } from "@/components/board/board-mobile-switcher";
import { GameSheet } from "@/components/board/game-sheet";
import { SessionSheet } from "@/components/board/session-sheet";
import { Button } from "@/components/ui/button";
import { useBoardColumns } from "@/hooks/use-board-columns";
import { useBoardInteractions } from "@/hooks/use-board-interactions";
import { useBoardState } from "@/hooks/use-board-state";
import { getColumnCounts } from "@/lib/board/get-column-counts";
import {
  boardColumns,
  mockBoardGames,
  mockCatalogGames,
} from "@/lib/board/mock-board-games";
import type {
  BoardStatus,
  CatalogGame,
  PlaySession,
} from "@/lib/board/board.types";

type BoardView = "board" | "list";

export function BoardShell() {
  const { games, sort, moveGame, addGame, registerSession } =
    useBoardState(mockBoardGames);
  const gamesByStatus = useBoardColumns(games, sort);
  const counts = useMemo(() => getColumnCounts(gamesByStatus), [gamesByStatus]);
  const { selectedGameId, openGame, closeGame } = useBoardInteractions();
  const [activeStatus, setActiveStatus] = useState<BoardStatus>("playing");
  const [view, setView] = useState<BoardView>("board");
  const [viewsOpen, setViewsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [touchDragGameId, setTouchDragGameId] = useState<string | null>(null);
  const selectedGame = games.find((game) => game.id === selectedGameId) ?? null;

  useEffect(() => {
    if (!touchDragGameId) return;
    function finishTouchDrag(event: PointerEvent) {
      const target = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-drop-target]");
      const status = target?.dataset.dropTarget as BoardStatus | undefined;
      if (status) {
        moveGame({ gameId: touchDragGameId, destinationStatus: status });
        setActiveStatus(status);
      }
      setTouchDragGameId(null);
    }
    window.addEventListener("pointerup", finishTouchDrag, { once: true });
    return () => window.removeEventListener("pointerup", finishTouchDrag);
  }, [moveGame, touchDragGameId]);

  function handleMove(destinationStatus: BoardStatus) {
    if (!selectedGame) return;
    moveGame({ gameId: selectedGame.id, destinationStatus });
    setActiveStatus(destinationStatus);
  }
  function handleAdd(game: CatalogGame, destinationStatus: BoardStatus) {
    addGame({ game, destinationStatus });
    setActiveStatus(destinationStatus);
  }
  function handleSession(session: PlaySession) {
    if (selectedGame) registerSession({ gameId: selectedGame.id, session });
  }

  return (
    <div className="relative">
      <BoardHeader
        title="O que está em jogo."
        summary="Um lugar calmo para acompanhar o que você quer jogar, o que está vivendo agora e o que ficou."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="hidden min-h-11 items-center gap-2 rounded-full bg-(--action-bg) px-4 text-sm font-semibold text-(--action-fg) hover:bg-(--accent) md:inline-flex"
            >
              <Plus aria-hidden="true" size={17} />
              Adicionar jogo
            </button>
            <div className="relative">
              <Button
                variant="secondary"
                className="min-h-11 px-4"
                aria-expanded={viewsOpen}
                onClick={() => setViewsOpen((value) => !value)}
              >
                <LayoutGrid aria-hidden="true" size={16} />
                <span className="ml-2">Visões</span>
              </Button>
              {viewsOpen && (
                <div className="absolute left-0 z-20 mt-2 w-40 rounded-2xl border border-(--line) bg-(--surface) p-1 shadow-lg md:left-auto md:right-0">
                  <button
                    type="button"
                    onClick={() => {
                      setView("board");
                      setViewsOpen(false);
                    }}
                    className={`flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold ${view === "board" ? "bg-(--surface-muted)" : ""}`}
                  >
                    <LayoutGrid size={16} />
                    Board
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setView("list");
                      setViewsOpen(false);
                    }}
                    className={`flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold ${view === "list" ? "bg-(--surface-muted)" : ""}`}
                  >
                    <List size={16} />
                    Lista
                  </button>
                </div>
              )}
            </div>
          </div>
        }
      />
      {view === "board" && (
        <>
          <div className="mt-7">
            <BoardMobileSwitcher
              columns={boardColumns}
              activeStatus={activeStatus}
              counts={counts}
              onStatusChange={setActiveStatus}
            />
          </div>
          <div className="mt-6">
            <BoardGrid
              columns={boardColumns}
              gamesByStatus={gamesByStatus}
              activeStatus={activeStatus}
              onOpenGame={openGame}
              onDropGame={(gameId, status, index) => {
                moveGame({
                  gameId,
                  destinationStatus: status,
                  destinationIndex: index,
                });
                setActiveStatus(status);
              }}
              onTouchDragStart={setTouchDragGameId}
              onStatusChange={setActiveStatus}
            />
          </div>
        </>
      )}
      {view === "list" && (
        <div className="mt-8">
          <BoardList gamesByStatus={gamesByStatus} onOpenGame={openGame} />
        </div>
      )}
      <button
        type="button"
        aria-label="Adicionar jogo"
        onClick={() => setAddOpen(true)}
        className="fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom))] right-5 z-30 inline-flex size-12 items-center justify-center rounded-full bg-(--action-bg) text-(--action-fg) shadow-lg md:hidden"
      >
        <Plus aria-hidden="true" size={19} />
      </button>
      {touchDragGameId && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end bg-black/50 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:hidden">
          <p className="mb-3 text-center text-sm font-semibold text-white">
            Solte o jogo em uma coluna
          </p>
          <div className="grid grid-cols-2 gap-2">
            {boardColumns.map((column) => (
              <div
                key={column.key}
                data-drop-target={column.key}
                className="flex min-h-15 items-center rounded-2xl border border-white/20 bg-(--surface) px-4 text-sm font-semibold"
              >
                {column.title}
              </div>
            ))}
          </div>
        </div>
      )}
      <AddGameSheet
        open={addOpen}
        games={games}
        catalog={mockCatalogGames}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <GameSheet
        game={selectedGame}
        onClose={closeGame}
        onMove={handleMove}
        onRegisterSession={() => setSessionOpen(true)}
      />
      <SessionSheet
        open={sessionOpen}
        gameTitle={selectedGame?.title ?? "Jogo"}
        onClose={() => setSessionOpen(false)}
        onSave={handleSession}
      />
    </div>
  );
}
