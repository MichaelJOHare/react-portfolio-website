import { useGame } from "../../../context/GameContext";
import { ColorChoice, StrengthLevel } from "../../../types";
import { MoveListButton } from "./MoveListButton";

export const MoveList = () => {
  const {
    gameManager,
    highlighter,
    pieceSelector,
    promotionHandler,
    stockfishHandler,
    engineOptions,
  } = useGame();
  const {
    undoPreviousMoveSquares,
    clearStockfishBestMoveArrow,
    clearDrawnHighlights,
    addPreviousMoveSquares,
  } = highlighter;
  const { replayMoves, moveHistory, undoneMoveHistory } = gameManager;
  const { deselectPiece } = pieceSelector;
  const { clearPromotionDetails, isShown } = promotionHandler;
  const { interruptEngineThinking } = stockfishHandler;
  const isPlayingVsComputer =
    engineOptions.colorChoice !== ColorChoice.NONE &&
    engineOptions.strengthLevel !== StrengthLevel.NONE;

  const clearUI = () => {
    interruptEngineThinking();
    clearPromotionDetails();
    clearDrawnHighlights();
    clearStockfishBestMoveArrow();
    deselectPiece();
  };

  const onMoveClick = (index: number) => {
    // eventually change this to visually undo moves to show board state at time of move that was clicked
    // and prevent moving pieces when playing against computer
    const increment = isShown ? 1 : 0;
    if (!isPlayingVsComputer) {
      clearUI();

      if (index < moveHistory.length) {
        const movesToUndo = moveHistory.length - index - 1;
        if (movesToUndo > 0) {
          replayMoves(movesToUndo, true);
        }
        undoPreviousMoveSquares(movesToUndo + increment);
      } else {
        const currentPosition = moveHistory.length;
        const targetPosition = index + 1;
        const movesToRedo = targetPosition - currentPosition;
        if (movesToRedo > 0) {
          replayMoves(movesToRedo, false);
          const redoMoves = undoneMoveHistory.slice(-movesToRedo).reverse();
          redoMoves.forEach(({ move }) => {
            addPreviousMoveSquares(move.from, move.to);
          });
        }
      }
    }
  };

  const allMoves = [...moveHistory, ...undoneMoveHistory.slice().reverse()];
  const currentMoveIndex = moveHistory.length - 1;

  const moveRows = [];
  for (let i = 0; i < allMoves.length; i += 2) {
    moveRows.push([allMoves[i], allMoves[i + 1]]);
  }

  return (
    <div className="w-full">
      <ul className="flex w-full flex-col divide-y divide-neutral-400">
        {moveRows.map(([whiteRecord, blackRecord], rowIndex) => {
          const whiteIndex = rowIndex * 2;
          const blackIndex = whiteIndex + 1;
          const isWhiteUndone = whiteIndex > currentMoveIndex;
          const isBlackUndone = blackIndex > currentMoveIndex;

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
                  isActive={whiteIndex === currentMoveIndex}
                  isUndone={isWhiteUndone}
                  isWhite={true}
                  onClick={() => onMoveClick(whiteIndex)}
                />
              )}

              {blackRecord ? (
                <MoveListButton
                  move={blackRecord.move}
                  record={blackRecord}
                  isActive={blackIndex === currentMoveIndex}
                  isUndone={isBlackUndone}
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
