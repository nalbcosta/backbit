"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";

import { AddGameSheet } from "@/components/board/add-game-sheet";
import { BoardGrid } from "@/components/board/board-grid";
import { BoardHeader } from "@/components/board/board-header";
import { BoardList } from "@/components/board/board-list";
import { BoardToolbar } from "@/components/board/board-toolbar";
import { BoardGlobalEmptyState } from "@/components/board/board-global-empty-state";
import { BoardMobileSwitcher } from "@/components/board/board-mobile-switcher";
import { GameSheet } from "@/components/board/game-sheet";
import { SessionSheet } from "@/components/board/session-sheet";
import { SessionTimerPlayer } from "@/components/board/session-timer-player";
import { Button } from "@/components/ui/button";
import { useBoardColumns } from "@/hooks/use-board-columns";
import { useBoardInteractions } from "@/hooks/use-board-interactions";
import { useBoardState } from "@/hooks/use-board-state";
import { useSessionTimer } from "@/hooks/use-session-timer";
import { getColumnCounts } from "@/lib/board/get-column-counts";
import { filterBoardGames } from "@/lib/board/filter-board-games";
import {
  boardColumns,
  mockBoardGames,
  mockCatalogGames,
} from "@/lib/board/mock-board-games";
import type {
  BoardStatus,
  BoardFilters,
  BoardSort,
  CatalogGame,
  PlaySession,
} from "@/lib/board/board.types";

type BoardView = "board" | "list";

export function BoardShell() {
  const {
    games,
    sort,
    moveGame,
    removeGame,
    addGame,
    registerSession,
    updateSession,
    removeSession,
    undoEntry,
    undoLastRemoval,
  } = useBoardState(mockBoardGames);
  const [filters, setFilters] = useState<BoardFilters>({});
  const [boardSort, setBoardSort] = useState<BoardSort>(sort);
  const visibleGames = useMemo(
    () => filterBoardGames(games, filters),
    [filters, games],
  );
  const gamesByStatus = useBoardColumns(visibleGames, boardSort);
  const counts = useMemo(() => getColumnCounts(gamesByStatus), [gamesByStatus]);
  const { selectedGameId, openGame, closeGame } = useBoardInteractions();
  const timer = useSessionTimer();
  const [activeStatus, setActiveStatus] = useState<BoardStatus>("playing");
  const [view, setView] = useState<BoardView>("board");
  const [viewsOpen, setViewsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionTargetGameId, setSessionTargetGameId] = useState<string | null>(
    null,
  );
  const [editingSession, setEditingSession] = useState<PlaySession | null>(
    null,
  );
  const [touchDragGameId, setTouchDragGameId] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const selectedGame = games.find((game) => game.id === selectedGameId) ?? null;
  const sessionGame =
    games.find((game) => game.id === sessionTargetGameId) ?? selectedGame;
  const platforms = useMemo(
    () => [...new Set(games.map((game) => game.platform))].sort(),
    [games],
  );
  const tags = useMemo(
    () => [...new Set(games.flatMap((game) => game.tags))].sort(),
    [games],
  );
  const hasFilters = Boolean(
    filters.query || filters.platform || filters.tags?.length || filters.status,
  );
  const visibleGameCount = visibleGames.length;

  useEffect(() => {
    if (!undoEntry) return;
    setToastVisible(true);
    const timeout = window.setTimeout(() => setToastVisible(false), 6000);
    return () => window.clearTimeout(timeout);
  }, [undoEntry]);

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
    if (!sessionGame) return;
    if (editingSession) {
      updateSession({ gameId: sessionGame.id, session });
    } else {
      registerSession({ gameId: sessionGame.id, session });
    }
    setEditingSession(null);
  }
  function openNewSession() {
    setSessionTargetGameId(timer.gameId ?? selectedGame?.id ?? null);
    setEditingSession(null);
    setSessionOpen(true);
  }
  function openEditSession(session: PlaySession) {
    setSessionTargetGameId(selectedGame?.id ?? null);
    setEditingSession(session);
    setSessionOpen(true);
  }
  function handleStartTimer() {
    if (!sessionGame) return;
    timer.start(sessionGame.id);
  }
  function handleFinishTimer() {
    if (!timer.gameId) return;
    setSessionTargetGameId(timer.gameId);
    setEditingSession(null);
    setSessionOpen(true);
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
          <div className="mt-6">
            <BoardToolbar
              filters={filters}
              sort={boardSort}
              platforms={platforms}
              tags={tags}
              onFiltersChange={setFilters}
              onSortChange={setBoardSort}
              onClear={() => setFilters({})}
            />
          </div>
          <div className="mt-7">
            <BoardMobileSwitcher
              columns={boardColumns}
              activeStatus={activeStatus}
              counts={counts}
              onStatusChange={setActiveStatus}
            />
          </div>
          <div className="mt-6">
            {visibleGameCount > 0 ? (
              <BoardGrid
                columns={boardColumns}
                gamesByStatus={gamesByStatus}
                activeStatus={activeStatus}
                onOpenGame={openGame}
                onRemoveGame={removeGame}
                onMoveGame={(gameId, status) => moveGame({ gameId, destinationStatus: status })}
                onRegisterSession={(gameId) => {
                  openGame(gameId);
                  setSessionTargetGameId(gameId);
                  setEditingSession(null);
                  setSessionOpen(true);
                }}
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
            ) : (
              <BoardGlobalEmptyState
                filtered={hasFilters}
                onAdd={() => setAddOpen(true)}
                onClear={() => setFilters({})}
              />
            )}
          </div>
        </>
      )}
      {view === "list" && (
        <div className="mt-8">
          <BoardToolbar
            filters={filters}
            sort={boardSort}
            platforms={platforms}
            tags={tags}
            onFiltersChange={setFilters}
            onSortChange={setBoardSort}
            onClear={() => setFilters({})}
          />
          <div className="mt-8">
            {visibleGameCount > 0 ? (
              <BoardList
                gamesByStatus={gamesByStatus}
                onOpenGame={openGame}
                onRemoveGame={removeGame}
                onMoveGame={(gameId, status) => moveGame({ gameId, destinationStatus: status })}
                onRegisterSession={(gameId) => {
                  openGame(gameId);
                  setSessionTargetGameId(gameId);
                  setEditingSession(null);
                  setSessionOpen(true);
                }}
              />
            ) : (
              <BoardGlobalEmptyState
                filtered={hasFilters}
                onAdd={() => setAddOpen(true)}
                onClear={() => setFilters({})}
              />
            )}
          </div>
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
      {timer.gameId && sessionGame && (
        <SessionTimerPlayer
          gameTitle={sessionGame.title}
          seconds={timer.elapsedSeconds}
          running={timer.isRunning}
          onPause={timer.pause}
          onResume={timer.resume}
          onFinish={handleFinishTimer}
          onDiscard={timer.reset}
        />
      )}
      {toastVisible && undoEntry && (
        <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-1/2 z-50 flex w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 items-center gap-4 rounded-2xl border border-(--line) bg-(--surface) px-4 py-3 text-sm shadow-xl md:bottom-6 md:left-auto md:right-6 md:w-auto md:translate-x-0">
          <span className="text-(--ink-muted)">
            {undoEntry.kind === "game"
              ? `${undoEntry.game.title} removido.`
              : "Sessão removida."}
          </span>
          <button
            type="button"
            onClick={() => {
              undoLastRemoval();
              setToastVisible(false);
            }}
            className="font-semibold text-(--accent) hover:underline"
          >
            Desfazer
          </button>
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
        onRegisterSession={openNewSession}
        onEditSession={openEditSession}
        onDeleteSession={(sessionId) => {
          if (sessionGame) removeSession(sessionGame.id, sessionId);
        }}
      />
      <SessionSheet
        open={sessionOpen}
        gameTitle={sessionGame?.title ?? "Jogo"}
        initialSession={editingSession}
        onClose={() => {
          setSessionOpen(false);
          setEditingSession(null);
          setSessionTargetGameId(null);
        }}
        onSave={handleSession}
        timerSeconds={timer.elapsedSeconds}
        timerRunning={timer.isRunning}
        onStartTimer={handleStartTimer}
        onPauseTimer={timer.pause}
        onResumeTimer={timer.resume}
        onFinishTimer={timer.reset}
        onDiscardTimer={timer.reset}
      />
    </div>
  );
}
