import { useGame } from "../../../context/GameContext";
import { PlayerType } from "../../../types";
import { getEffectiveSquare } from "../../../utils";
import RightArrowIcon from "@/assets/icons/right-arrow-icon.svg";

type UndoRedoButtonProps = {
  direction: "left" | "right";
};

export const UndoRedoButton = ({ direction }: UndoRedoButtonProps) => {
  const {
    gameManager,
    highlighter,
    pieceSelector,
    promotionHandler,
    stockfishHandler,
    isBoardFlipped,
  } = useGame();
  const { replayMoves, players, undoneMoveHistory, moveHistory } = gameManager;
  const {
    clearDrawnHighlights,
    clearStockfishBestMoveArrow,
    undoPreviousMoveSquares,
    addPreviousMoveSquares,
  } = highlighter;
  const { deselectPiece } = pieceSelector;
  const { clearPromotionDetails } = promotionHandler;
  const { setShouldStopThinking, resetEngine } = stockfishHandler;

  const clearUI = () => {
    setShouldStopThinking((prev) => !prev);
    resetEngine();
    clearPromotionDetails();
    clearDrawnHighlights();
    clearStockfishBestMoveArrow();
    deselectPiece();
  };

  const handleUndoMove = () => {
    if (moveHistory.length === 0) return;
    clearUI();
    const isVsComputer =
      players[0].type === PlayerType.COMPUTER || // test for undo during stockfish move
      players[1].type === PlayerType.COMPUTER; // make button unclickable if players[currentPlayerIndex].type === PlayerType.COMPUTER
    const undoCount = isVsComputer ? 2 : 1;
    if (moveHistory.length < undoCount) return;

    replayMoves(undoCount, true);
    undoPreviousMoveSquares(undoCount);
  };

  const handleRedoMove = () => {
    if (undoneMoveHistory.length === 0) return;
    clearUI();
    const isVsComputer =
      players[0].type === PlayerType.COMPUTER ||
      players[1].type === PlayerType.COMPUTER;
    const redoCount = isVsComputer ? 2 : 1;
    if (undoneMoveHistory.length < redoCount) return;

    const previousMoveSquares = undoneMoveHistory
      .slice(-redoCount)
      .map(({ move, wasBoardFlipped }) => {
        const fromSq = getEffectiveSquare(
          move.from,
          wasBoardFlipped,
          isBoardFlipped
        );
        const toSq = getEffectiveSquare(
          move.to,
          wasBoardFlipped,
          isBoardFlipped
        );
        return { startSquare: fromSq, endSquare: toSq };
      });

    replayMoves(redoCount, false);
    previousMoveSquares.forEach(({ startSquare, endSquare }) => {
      addPreviousMoveSquares(startSquare, endSquare);
    });
  };

  if (direction === "left") {
    return (
      <button
        type="button"
        onClick={() => {
          handleUndoMove();
        }}
        className="w-full text-white bg-zinc-700 hover:bg-zinc-900 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-1.5 dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:focus:ring-blue-800"
      >
        <RightArrowIcon className="size-full transform rotate-180 text-neutral-200" />
        <span className="sr-only">Previous Move</span>
      </button>
    );
  } else if (direction === "right") {
    return (
      <button
        type="button"
        onClick={() => {
          handleRedoMove();
        }}
        className="w-full text-white bg-zinc-700 hover:bg-zinc-900  focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center ms-1.5 dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:focus:ring-blue-800"
      >
        <RightArrowIcon className="size-full text-neutral-200" />
        <span className="sr-only">Previous Move</span>
      </button>
    );
  }
};
