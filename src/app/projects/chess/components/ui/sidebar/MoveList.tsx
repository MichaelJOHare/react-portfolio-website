import { useGame } from "../../../context/GameContext";
import { MoveListButton } from "./MoveListButton";

export const MoveList = () => {
  const {
    gameManager,
    highlighter,
    pieceSelector,
    promotionHandler,
    stockfishHandler,
  } = useGame();

  const { replayMoves, moveHistory } = gameManager;
  const {
    undoPreviousMoveSquares,
    clearStockfishBestMoveArrow,
    clearDrawnHighlights,
  } = highlighter;
  const { deselectPiece } = pieceSelector;
  const { clearPromotionDetails } = promotionHandler;
  const { resetEngine } = stockfishHandler;

  const clearUI = () => {
    resetEngine();
    clearPromotionDetails();
    clearDrawnHighlights();
    clearStockfishBestMoveArrow();
    deselectPiece();
  };

  const onMoveClick = (index: number) => {
    clearUI();
    const movesToUndo = moveHistory.length - index - 1;
    if (movesToUndo > 0) {
      replayMoves(movesToUndo, true);
    }
    undoPreviousMoveSquares(movesToUndo);
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
                  onClick={() => onMoveClick(whiteIndex)}
                  isWhite={true}
                />
              )}

              {blackRecord ? (
                <MoveListButton
                  move={blackRecord.move}
                  record={blackRecord}
                  isActive={blackIndex === moveHistory.length - 1}
                  onClick={() => onMoveClick(blackIndex)}
                  isWhite={false}
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
