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
    promotionHandler,
    isBoardFlipped,
    toggleFlipBoard,
    onResetGame,
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
  const { flipPromotionDetails } = promotionHandler;
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
    flipPromotionDetails();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative h-full w-full">
        <div className="flex h-full w-full flex-col rounded-lg border border-gray-200 bg-neutral-300 dark:border-gray-600 dark:bg-gray-700">
          <div className="flex items-center justify-center border-b border-gray-400 px-3 py-2 dark:border-gray-600">
            <div className="flex w-full max-w-lg items-center justify-between">
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
          <div className="flex h-full min-h-64 flex-col rounded-b-lg bg-neutral-100 px-4 py-2 dark:bg-gray-800">
            <div
              className="h-full max-h-[50vmin] overflow-y-auto"
              style={{ scrollbarGutter: "stable" }}
            >
              <MoveList />
            </div>
          </div>
          {showFenTextArea && (
            <textarea
              className="mt-2 rounded-sm border border-gray-300 p-2"
              rows={5}
              defaultValue={toFEN(
                board,
                players,
                currentPlayerIndex,
                movesHistory,
                halfMoveClock,
                fullMoveNumber,
                isBoardFlipped,
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
