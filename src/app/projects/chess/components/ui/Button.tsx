import { useGame } from "../../context/GameContext";
import { PlayerType } from "../../types";

type ButtonProps = {
  direction: "left" | "right";
};

export default function Button({ direction }: ButtonProps) {
  const { gameManager, highlighter, pieceSelector } = useGame();
  const { undoMove, redoMove, players } = gameManager;

  const clearUI = () => {
    highlighter.clearDrawnHighlights();
    highlighter.clearStockfishBestMoveArrow();
    highlighter.clearPreviousMoveSquares();
    pieceSelector.deselectPiece();
  };

  if (direction === "left") {
    return (
      <button
        type="button"
        onClick={() => {
          if (
            players[0].type === PlayerType.COMPUTER ||
            players[1].type === PlayerType.COMPUTER
          ) {
            [0, 1].forEach(() => undoMove());
          } else {
            undoMove();
          }
          clearUI(); // find way to conditionally clear highlights based on move history length
        }}
        className="w-full text-white bg-zinc-700 hover:bg-zinc-900 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-1.5 dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:focus:ring-blue-800"
      >
        <svg
          className="w-full h-full transform rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span className="sr-only">Previous Move</span>
      </button>
    );
  } else if (direction === "right") {
    return (
      <button
        type="button"
        onClick={() => {
          if (
            players[0].type === PlayerType.COMPUTER ||
            players[1].type === PlayerType.COMPUTER
          ) {
            [0, 1].forEach(() => redoMove());
          } else {
            redoMove();
          }
          clearUI();
        }}
        className="w-full text-white bg-zinc-700 hover:bg-zinc-900  focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center ms-1.5 dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:focus:ring-blue-800"
      >
        <svg
          className="w-full h-full"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span className="sr-only">Previous Move</span>
      </button>
    );
  }
}
