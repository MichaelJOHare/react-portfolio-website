import { useGame } from "../../context/GameContext";
import { PlayerType } from "../../types";
import RightArrowIcon from "@/assets/icons/right-arrow-icon.svg";

type UndoRedoButtonProps = {
  direction: "left" | "right";
};

export const UndoRedoButton = ({ direction }: UndoRedoButtonProps) => {
  const { gameManager, highlighter, pieceSelector } = useGame();
  const { undoMove, redoMove, players } = gameManager;

  const clearUI = () => {
    highlighter.clearDrawnHighlights();
    highlighter.clearStockfishBestMoveArrow();
    pieceSelector.deselectPiece();
  };

  if (direction === "left") {
    return (
      <button
        type="button"
        onClick={() => {
          if (gameManager.moveHistory.length > 0) {
            // need to fix move -> undo -> different move -> redo -> incorrect last move highlight
            clearUI();
            if (
              players[0].type === PlayerType.COMPUTER ||
              players[1].type === PlayerType.COMPUTER
            ) {
              [0, 1].forEach(() => undoMove());
            } else {
              undoMove();
              highlighter.undoPreviousMoveSquares();
            }
          }
        }}
        className="w-full text-white bg-zinc-700 hover:bg-zinc-900 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-1.5 dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:focus:ring-blue-800"
      >
        <RightArrowIcon className="size-full transform rotate-180" />
        <span className="sr-only">Previous Move</span>
      </button>
    );
  } else if (direction === "right") {
    return (
      <button
        type="button"
        onClick={() => {
          if (gameManager.undoneMoves.length > 0) {
            clearUI();
            if (
              players[0].type === PlayerType.COMPUTER ||
              players[1].type === PlayerType.COMPUTER
            ) {
              [0, 1].forEach(() => redoMove());
            }
            const move = gameManager.undoneMoves.at(-1);
            if (!move) return;

            redoMove();
            highlighter.addPreviousMoveSquares(move.from, move.to);
          }
        }}
        className="w-full text-white bg-zinc-700 hover:bg-zinc-900  focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center ms-1.5 dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:focus:ring-blue-800"
      >
        <RightArrowIcon className="size-full" />
        <span className="sr-only">Previous Move</span>
      </button>
    );
  }
};
