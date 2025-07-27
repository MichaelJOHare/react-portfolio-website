import { useGame } from "../../context/GameContext";
import { UndoRedoButton } from "./sidebar/UndoRedoButton";
import { Sidebar } from "./sidebar/Sidebar";

export const UIContainer = () => {
  const { stockfishHandler, stockfishEnabled } = useGame();
  const { depthPercentage } = stockfishHandler;

  return (
    <div className="h-chess-h lg:w-desktop-w mt-2 flex w-full flex-col lg:mt-8">
      <div className="order-first flex h-2/6 w-full justify-between pt-0 pb-2 lg:order-last lg:h-[15%] lg:pt-2 lg:pb-0">
        <UndoRedoButton direction={"left"} />
        <UndoRedoButton direction={"right"} />
      </div>
      <div
        className={`relative flex h-1.5 w-full items-center justify-center pr-0.5 ${stockfishEnabled ? "visible" : "hidden"}`}
      >
        <progress
          id="depth-progress"
          role="progressbar"
          aria-label="depth progress"
          className="progress-unfilled:bg-emerald-700 dark:progress-unfilled:bg-emerald-600 dark:progress-filled:bg-stone-900 h-1.5 w-[97%] overflow-hidden rounded-tl-full rounded-tr-full"
          value={depthPercentage}
          max={100}
        ></progress>
      </div>
      <div className="lg:max-h-auto max-h-[85%] flex-1">
        <Sidebar />
      </div>
    </div>
  );
};
