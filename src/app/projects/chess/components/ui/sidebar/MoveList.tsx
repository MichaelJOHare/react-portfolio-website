import {
  getEffectiveSquare,
  getPieceUnicode,
  squareToString,
} from "../../../utils";
import { PieceType, PlayerColor } from "../../../types";
import { useGame } from "../../../context/GameContext";

export const MoveList = () => {
  const {
    gameManager,
    highlighter,
    pieceSelector,
    promotionHandler,
    stockfishHandler,
    isBoardFlipped,
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
  const movesHistory = moveHistory.map(({ move, wasBoardFlipped }) => ({
    move,
    wasBoardFlipped,
  }));

  const onMoveClick = (index: number) => {
    clearUI();
    console.log(moveHistory.length, index);
    const movesToUndo = movesHistory.length - index - 1;
    if (movesToUndo > 0) {
      replayMoves(movesToUndo, true);
    }
    undoPreviousMoveSquares(movesToUndo);
  };

  const clearUI = () => {
    resetEngine();
    clearPromotionDetails();
    clearDrawnHighlights();
    clearStockfishBestMoveArrow();
    deselectPiece();
  };

  const moveRows = [];
  for (let i = 0; i < movesHistory.length; i += 2) {
    moveRows.push([movesHistory[i], movesHistory[i + 1]]);
  }

  return (
    // add disambiguate capture/promotion/etc.
    <div className="w-full">
      <ul className="flex flex-col w-full divide-y divide-neutral-400">
        {moveRows.map(([whiteRecord, blackRecord], rowIndex) => {
          const whiteMove = whiteRecord?.move;
          const whiteWasFlipped = whiteRecord?.wasBoardFlipped;

          const blackMove = blackRecord?.move;
          const blackWasFlipped = blackRecord?.wasBoardFlipped;

          const whiteTo = getEffectiveSquare(
            whiteMove.to,
            whiteWasFlipped,
            isBoardFlipped
          );
          const blackTo = blackMove
            ? getEffectiveSquare(blackMove.to, blackWasFlipped, isBoardFlipped)
            : null;

          return (
            <li
              key={rowIndex}
              className="grid grid-cols-[auto_1fr_1fr] items-center py-1 px-2"
            >
              <span className="font-bold text-xl pr-2">{rowIndex + 1}.</span>

              {/* white move */}
              <button
                type="button"
                className={`flex items-center gap-1 hover:bg-zinc-300 dark:hover:bg-slate-400 rounded px-2 py-1 ${
                  rowIndex * 2 === movesHistory.length - 1
                    ? "border border-stone-700 dark:border-stone-200 bg-zinc-200 dark:bg-slate-600"
                    : ""
                }`}
                onClick={() => onMoveClick(rowIndex * 2)}
              >
                {whiteMove?.piece?.type !== PieceType.PAWN && (
                  <span
                    className={`text-3xl mb-1 ${
                      whiteMove.piece.color === PlayerColor.BLACK
                        ? "drop-shadow-bPiece dark:text-neutral-900"
                        : "text-neutral-100 drop-shadow-wPiece"
                    }`}
                  >
                    {getPieceUnicode(whiteMove.piece.type)}
                  </span>
                )}
                <span className="text-2xl text-gray-800 dark:text-gray-200 min-w-[2.5rem] text-center">
                  {squareToString(whiteTo)}
                </span>
              </button>

              {/* black move */}
              {blackMove ? (
                <button
                  type="button"
                  className={`flex items-center gap-1 hover:bg-zinc-300 dark:hover:bg-slate-400 rounded px-2 py-1 ${
                    rowIndex * 2 + 1 === movesHistory.length - 1
                      ? "border border-stone-700 dark:border-stone-200 bg-zinc-200 dark:bg-slate-600"
                      : ""
                  }`}
                  onClick={() => onMoveClick(rowIndex * 2 + 1)}
                >
                  {blackMove?.piece?.type !== PieceType.PAWN && (
                    <span
                      className={`text-3xl mb-1 ${
                        blackMove.piece.color === PlayerColor.BLACK
                          ? "drop-shadow-bPiece dark:text-neutral-900"
                          : "text-neutral-100 drop-shadow-wPiece"
                      }`}
                    >
                      {getPieceUnicode(blackMove.piece.type)}
                    </span>
                  )}
                  {blackTo && (
                    <span className="text-2xl text-gray-800 dark:text-gray-200 min-w-[2.5rem] text-center">
                      {squareToString(blackTo)}
                    </span>
                  )}
                </button>
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
