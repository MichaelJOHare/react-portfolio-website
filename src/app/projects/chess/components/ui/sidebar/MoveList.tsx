import {
  flipSquare,
  getFileFromCol,
  getPieceUnicode,
  squareToString,
} from "../../../utils";
import { PieceType } from "../../../types";
import { useGame } from "../../../context/GameContext";

export const MoveList = () => {
  const {
    gameManager,
    highlighter,
    pieceSelector,
    promotionHandler,
    stockfishHandler,
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

  const onMoveClick = (index: number) => {
    clearUI();
    const movesToUndo = moveHistory.length - index - 1;
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
  for (let i = 0; i < moveHistory.length; i += 2) {
    moveRows.push([moveHistory[i], moveHistory[i + 1]]);
  }

  return (
    // add disambiguate castle/promotion/etc.
    <div className="w-full">
      <ul className="flex w-full flex-col divide-y divide-neutral-400">
        {moveRows.map(([whiteRecord, blackRecord], rowIndex) => {
          const whiteMove = whiteRecord?.move;
          const blackMove = blackRecord?.move;

          const whiteFrom =
            whiteMove &&
            (whiteRecord.wasBoardFlipped
              ? flipSquare(whiteMove.from)
              : whiteMove.from);
          const whiteTo =
            whiteMove &&
            (whiteRecord.wasBoardFlipped
              ? flipSquare(whiteMove.to)
              : whiteMove.to);
          const blackFrom =
            blackMove &&
            (blackRecord.wasBoardFlipped
              ? flipSquare(blackMove.from)
              : blackMove.from);
          const blackTo =
            blackMove &&
            (blackRecord.wasBoardFlipped
              ? flipSquare(blackMove.to)
              : blackMove.to);

          return (
            <li
              key={rowIndex}
              className="grid h-15 grid-cols-[auto_1fr_1fr] items-center py-1"
            >
              <span className="pr-2 text-xl font-bold">{rowIndex + 1}.</span>

              {/* white move */}
              <button
                type="button"
                className={`mr-1 flex h-full items-center gap-1 rounded px-2
                py-1 hover:bg-zinc-300 dark:hover:bg-slate-400 ${
                  rowIndex * 2 === moveHistory.length - 1
                    ? `border border-stone-700 bg-zinc-200 dark:border-stone-200
                      dark:bg-slate-600`
                    : ""
                }`}
                onClick={() => onMoveClick(rowIndex * 2)}
              >
                {whiteMove?.piece?.type !== PieceType.PAWN && (
                  <span
                    className="drop-shadow-wPiece mb-2 text-3xl
                      text-neutral-100"
                  >
                    {getPieceUnicode(whiteMove.piece.type)}
                  </span>
                )}
                <span
                  className="text-center text-2xl text-gray-800
                    dark:text-gray-200"
                >
                  {whiteMove.piece.type === PieceType.PAWN &&
                  whiteMove.capturedPiece
                    ? `${getFileFromCol(whiteFrom.col)}×${squareToString(whiteTo)}`
                    : `${whiteMove.capturedPiece ? "x" : ""}${squareToString(whiteTo)}`}
                  {whiteRecord?.causedCheck && "+"}
                  {moveHistory.at(-1)?.causedCheckMate && "#"}
                </span>
              </button>

              {/* black move */}
              {blackMove ? (
                <button
                  type="button"
                  className={`ml-1 flex h-full items-center gap-1 rounded py-1
                    pl-2 hover:bg-zinc-300 dark:hover:bg-slate-400 ${
                      rowIndex * 2 + 1 === moveHistory.length - 1
                        ? `border border-stone-700 bg-zinc-200
                          dark:border-stone-200 dark:bg-slate-600`
                        : ""
                    }`}
                  onClick={() => onMoveClick(rowIndex * 2 + 1)}
                >
                  {blackMove.piece?.type !== PieceType.PAWN && (
                    <span
                      className="drop-shadow-bPiece mb-2 text-3xl
                        dark:text-neutral-900"
                    >
                      {getPieceUnicode(blackMove.piece.type)}
                    </span>
                  )}
                  <span
                    className="text-center text-2xl text-gray-800
                      dark:text-gray-200"
                  >
                    {blackMove.piece.type === PieceType.PAWN &&
                    blackMove.capturedPiece
                      ? `${getFileFromCol(blackFrom.col)}×${squareToString(blackTo)}`
                      : `${blackMove.capturedPiece ? "x" : ""}${squareToString(blackTo)}`}
                    {moveHistory.at(-1)?.causedCheck && "+"}
                    {moveHistory.at(-1)?.causedCheckMate && "#"}
                  </span>
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
