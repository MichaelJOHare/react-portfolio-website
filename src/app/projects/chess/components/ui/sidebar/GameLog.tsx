import { useState } from "react";
import { toFEN } from "../../../utils/FEN";
import { StockfishOptionsModal } from "./StockfishOptionsModal";
import { useGame } from "../../../context/GameContext";
import { GameLogButton } from "./GameLogButton";
import { MoveList } from "./MoveList";

export const GameLog = () => {
  const { gameManager, highlighter, onResetGame, toggleFlipBoard } = useGame();
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
      <form className="h-full w-full max-h-fit relative lg:max-h-[60vmin] limitedHeight:max-h-fit">
        <div className="h-full w-full flex flex-col border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-center px-3 py-2 border-b dark:border-gray-600">
            <div className="w-full max-w-lg flex justify-between items-center">
              <GameLogButton
                icon="flipBoard"
                label="Flip Board"
                onClick={onFlipBoard}
              />
              <GameLogButton
                icon="fen"
                label="Import/export FEN"
                onClick={() => setShowFenTextArea((v) => !v)}
              />
              <GameLogButton
                icon="reset"
                label="Reset Game"
                onClick={onResetGame}
              />
              <GameLogButton
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
          <div className="h-full flex flex-col px-4 py-2 min-h-64 bg-white rounded-b-lg dark:bg-gray-800">
            <div className="h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                moveHistory,
                halfMoveClock,
                fullMoveNumber
              )}
              onChange={updateStateOnFenChange}
              /* add on move -> update fen, on user change -> update board/state */
            />
          )}
        </div>
      </form>
    </div>
  );
};
