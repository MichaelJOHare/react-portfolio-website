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
          className={`h-[90vmin] w-5 overflow-hidden border border-slate-800 dark:border-slate-100 border-spacing-0 mx-0.5 lg:h-[70vmin] limitedHeight:h-[90vmin] ${
            stockfishEnabled.nnueEnabled || stockfishEnabled.classicalEnabled
              ? "visible"
              : "hidden"
          }`}
        >
          <progress
            id="eval-gauge"
            className={`w-[90vmin] h-5 transform -rotate-90 translate-y-[90vmin] origin-top-left 
              ${
                isBoardFlipped
                  ? "progress-filled:bg-slate-100 progress-unfilled:bg-stone-900"
                  : "progress-filled:bg-stone-900 progress-unfilled:bg-slate-100"
              } 
              lg:translate-y-[70vmin] lg:w-[70vmin] limitedHeight:translate-y-[90vmin] limitedHeight:w-[90vmin]`}
            value={evalCentipawn}
            max={100}
          ></progress>
        </div>
      </div>
      <ChessUIContainer />
    </div>
  );
};
