"use client";

import { useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";

import { BoardGrid } from "@/components/board/board-grid";
import { BoardHeader } from "@/components/board/board-header";
import { BoardMobileSwitcher } from "@/components/board/board-mobile-switcher";
import { GameSheet } from "@/components/board/game-sheet";
import { Button } from "@/components/ui/button";
import { useBoardColumns } from "@/hooks/use-board-columns";
import { useBoardInteractions } from "@/hooks/use-board-interactions";
import { useBoardState } from "@/hooks/use-board-state";
import { getColumnCounts } from "@/lib/board/get-column-counts";
import { boardColumns, mockBoardGames } from "@/lib/board/mock-board-games";
import type { BoardStatus } from "@/lib/board/board.types";

export function BoardShell() {
  const { games, sort, moveGame } = useBoardState(mockBoardGames);
  const gamesByStatus = useBoardColumns(games, sort);
  const counts = useMemo(() => getColumnCounts(gamesByStatus), [gamesByStatus]);
  const { selectedGameId, openGame, closeGame } = useBoardInteractions();
  const [activeStatus, setActiveStatus] = useState<BoardStatus>("playing");
  const selectedGame = games.find((game) => game.id === selectedGameId) ?? null;

  function handleMove(destinationStatus: BoardStatus) {
    if (!selectedGame) return;
    moveGame({ gameId: selectedGame.id, destinationStatus });
    setActiveStatus(destinationStatus);
  }

  return (
    <div>
      <BoardHeader
        title="O que está em jogo."
        summary="Um lugar calmo para acompanhar o que você quer jogar, o que está vivendo agora e o que ficou."
        actions={
          <Button
            variant="secondary"
            className="min-h-11 px-4"
            aria-label="Opções do board indisponíveis nesta versão"
            disabled
          >
            <LayoutGrid aria-hidden="true" size={16} />{" "}
            <span className="ml-2">Visões</span>
          </Button>
        }
      />
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
        />
      </div>
      <GameSheet game={selectedGame} onClose={closeGame} onMove={handleMove} />
    </div>
  );
}
