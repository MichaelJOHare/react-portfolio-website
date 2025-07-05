import { Board } from "../board/Board";
import { useGame } from "../../context/GameContext";

export const ChessGameContainer = () => {
  const { stockfishEnabled } = useGame();

  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <div className="flex justify-center items-center">
        <Board />
        <div
          className={`h-[90vmin] w-5 overflow-hidden lg:h-[70vmin] border-[1px] border-slate-800 dark:border-slate-100 border-spacing-0 mx-0.5 ${
            stockfishEnabled.nnueEnabled || stockfishEnabled.classicalEnabled
              ? "visible"
              : "hidden"
          }`}
        >
          <progress
            id="eval-gauge"
            className="transform -rotate-90 translate-y-[90vmin] lg:translate-y-[70vmin] origin-top-left w-[90vmin] h-5 lg:w-[70vmin] progress-filled:bg-slate-100 progress-unfilled:bg-stone-900"
            value={50}
            max={100}
          ></progress>
        </div>
      </div>
    </div>
  );
};
