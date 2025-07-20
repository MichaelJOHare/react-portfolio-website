import { useGame } from "../../../context/GameContext";
import { ColorChoice, NO_SELECTION } from "../../../types";
import { MoveListButton } from "./MoveListButton";

export const MoveList = () => {
  const {
    gameManager,
    highlighter,
    pieceSelector,
    promotionHandler,
    stockfishHandler,
    colorChoice,
    strengthLevel,
  } = useGame();
  const {
    undoPreviousMoveSquares,
    clearStockfishBestMoveArrow,
    clearDrawnHighlights,
  } = highlighter;
  const { replayMoves, moveHistory } = gameManager;
  const { deselectPiece } = pieceSelector;
  const { clearPromotionDetails } = promotionHandler;
  const { resetEngine } = stockfishHandler;
  const isPlayingVsComputer =
    colorChoice !== ColorChoice.NONE && strengthLevel !== NO_SELECTION;

  const clearUI = () => {
    resetEngine();
    clearPromotionDetails();
    clearDrawnHighlights();
    clearStockfishBestMoveArrow();
    deselectPiece();
  };

  const onMoveClick = (index: number) => {
    // eventually change this to visually undo moves to show board state at time of move clicked
    if (!isPlayingVsComputer) {
      clearUI();
      const movesToUndo = moveHistory.length - index - 1;
      if (movesToUndo > 0) {
        replayMoves(movesToUndo, true);
      }
      undoPreviousMoveSquares(movesToUndo);
    }
  };

  const moveRows = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    moveRows.push([moveHistory[i], moveHistory[i + 1]]);
  }

  return (
    <div className="w-full">
      <ul className="flex w-full flex-col divide-y divide-neutral-400">
        {moveRows.map(([whiteRecord, blackRecord], rowIndex) => {
          const whiteIndex = rowIndex * 2;
          const blackIndex = whiteIndex + 1;

          return (
            <li
              key={rowIndex}
              className="grid h-15 grid-cols-[auto_1fr_1fr] items-center py-1"
            >
              <span className="pr-2 text-xl font-bold">{rowIndex + 1}.</span>

              {whiteRecord && (
                <MoveListButton
                  move={whiteRecord.move}
                  record={whiteRecord}
                  isActive={whiteIndex === moveHistory.length - 1}
                  isWhite={true}
                  onClick={() => onMoveClick(whiteIndex)}
                />
              )}

              {blackRecord ? (
                <MoveListButton
                  move={blackRecord.move}
                  record={blackRecord}
                  isActive={blackIndex === moveHistory.length - 1}
                  isWhite={false}
                  onClick={() => onMoveClick(blackIndex)}
                />
              ) : (
                <span />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
