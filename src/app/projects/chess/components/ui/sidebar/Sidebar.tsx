import { useState } from "react";
import { toFEN } from "../../../utils/FEN";
import { StockfishOptionsModal } from "./StockfishOptionsModal";
import { useGame } from "../../../context/GameContext";
import { SidebarButton } from "./SidebarButton";
import { MoveList } from "./MoveList";

export const Sidebar = () => {
  const {
    gameManager,
    highlighter,
    onResetGame,
    isBoardFlipped,
    toggleFlipBoard,
  } = useGame();
  const {
    board,
    players,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
    moveHistory,
    flipPiecesOnBoard,
  } = gameManager;
  const { flipAllHighlights } = highlighter;
  const [showFenTextArea, setShowFenTextArea] = useState(false);
  const [showStockfishOptions, setShowStockfishOptions] = useState(false);
  const movesHistory = moveHistory.map((record) => record.move);

  const updateStateOnFenChange = () => {
    // parse fen -> board[row][col].piece = piece etc.
    // set moveHistory/undoneHistory/highlights to empty
    // if epSquare, need to add move to move history for it to work
  };

  const onFlipBoard = () => {
    toggleFlipBoard();
    flipPiecesOnBoard();
    flipAllHighlights();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="h-full w-full relative">
        <div className="h-full w-full flex flex-col border border-gray-200 rounded-lg bg-neutral-300 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-center px-3 py-2 border-b border-gray-400 dark:border-gray-600">
            <div className="w-full max-w-lg flex justify-between items-center">
              <SidebarButton
                icon="flipBoard"
                label="Flip Board"
                onClick={onFlipBoard}
              />
              <SidebarButton
                icon="fen"
                label="Import/export FEN"
                onClick={() => setShowFenTextArea((v) => !v)}
              />
              <SidebarButton
                icon="reset"
                label="Reset Game"
                onClick={onResetGame}
              />
              <SidebarButton
                icon="stockfish"
                label="Stockfish Options"
                onClick={() => setShowStockfishOptions(true)}
              />
              <StockfishOptionsModal
                isOpen={showStockfishOptions}
                onClose={() => setShowStockfishOptions(false)}
              />
            </div>
          </div>
          <div className="h-full flex flex-col px-4 py-2 min-h-64 bg-neutral-100 rounded-b-lg dark:bg-gray-800">
            <div
              className="h-full max-h-[50vmin] overflow-y-auto"
              style={{ scrollbarGutter: "stable" }}
            >
              <MoveList />
            </div>
          </div>
          {showFenTextArea && (
            <textarea
              className="mt-2 p-2 border border-gray-300 rounded-sm"
              rows={5}
              defaultValue={toFEN(
                board,
                players,
                currentPlayerIndex,
                movesHistory,
                halfMoveClock,
                fullMoveNumber,
                isBoardFlipped
              )}
              onChange={updateStateOnFenChange}
              /* add on user change -> update board/state */
            />
          )}
        </div>
      </div>
    </div>
  );
};
