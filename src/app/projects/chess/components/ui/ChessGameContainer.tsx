import { Board } from "../board/Board";
import { useGame } from "../../context/GameContext";
import { ChessUIContainer } from "./ChessUIContainer";

export const ChessGameContainer = () => {
  const { stockfishHandler, stockfishEnabled, isBoardFlipped } = useGame();
  const { evalCentipawn } = stockfishHandler;

  return (
    <div className="flex flex-col justify-center pt-2 lg:flex-row limitedHeight:flex-col">
      <div className="flex justify-center items-center">
        <Board />
        <div
          className={`h-[90vmin] w-5 overflow-hidden bg-neutral-600 border border-slate-800 dark:border-slate-100 border-spacing-0 mx-0.5 lg:h-[70vmin] limitedHeight:h-[90vmin] ${
            isBoardFlipped ? "" : "rotate-180"
          } ${stockfishEnabled ? "visible" : "hidden"}`}
        >
          <div
            className="w-full bg-neutral-600 overflow-hidden"
            style={{ height: `${evalCentipawn}%` }}
          >
            <div className="flex w-full flex-col justify-center h-full bg-slate-200 transition-width duration-500 ease-in-out leading-none"></div>
          </div>
        </div>
      </div>
      <ChessUIContainer />
    </div>
  );
};
