import { useGame } from "../../../context/GameContext";
import { isComputerPlaying } from "../../../utils";
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
  } = useGame();
  const {
    clearDrawnHighlights,
    clearStockfishBestMoveArrow,
    undoPreviousMoveSquares,
    addPreviousMoveSquares,
  } = highlighter;
  const { replayMoves, players, undoneMoveHistory, moveHistory } = gameManager;
  const { deselectPiece } = pieceSelector;
  const { clearPromotionDetails } = promotionHandler;
  const { resetEngine } = stockfishHandler;
  const player1 = players[0];
  const player2 = players[1];

  const clearUI = () => {
    resetEngine();
    clearPromotionDetails();
    clearDrawnHighlights();
    clearStockfishBestMoveArrow();
    deselectPiece();
  };

  const handleUndoMove = () => {
    if (moveHistory.length === 0) return;
    clearUI();
    const undoCount = isComputerPlaying(player1, player2) ? 2 : 1;
    if (moveHistory.length < undoCount) return;

    replayMoves(undoCount, true);
    undoPreviousMoveSquares(undoCount);
  };

  const handleRedoMove = () => {
    if (undoneMoveHistory.length === 0) return;
    clearUI();
    const redoCount = isComputerPlaying(player1, player2) ? 2 : 1;
    if (undoneMoveHistory.length < redoCount) return;

    const previousMoveSquares = undoneMoveHistory
      .slice(-redoCount)
      .map(({ move }) => {
        return { startSquare: move.from, endSquare: move.to };
      });

    replayMoves(redoCount, false);
    previousMoveSquares.reverse().forEach(({ startSquare, endSquare }) => {
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
        className="me-1.5 inline-flex w-full items-center rounded-lg bg-zinc-700 p-2.5 text-center text-sm font-medium text-neutral-200 hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-600"
      >
        <RightArrowIcon className="size-full rotate-180 transform text-neutral-200" />
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
        className="ms-1.5 inline-flex w-full items-center rounded-lg bg-zinc-700 p-2.5 text-center text-sm font-medium text-neutral-200 hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-600"
      >
        <RightArrowIcon className="size-full text-neutral-200" />
        <span className="sr-only">Previous Move</span>
      </button>
    );
  }
};
