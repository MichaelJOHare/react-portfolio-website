import { useGame } from "../../context/GameContext";
import { UndoRedoButton } from "./sidebar/UndoRedoButton";
import { Sidebar } from "./sidebar/Sidebar";

export const UIContainer = () => {
  const { stockfishHandler, stockfishEnabled } = useGame();
  const { depthPercentage } = stockfishHandler;

  return (
    <div className="mobile:size-chess-size mobile:mt-0 desktop-md:w-desktop-w desktop-md:h-chess-h desktop-md:mt-8 flex flex-col">
      <div className="desktop-md:pt-2 desktop-md:pb-0 desktop-md:h-[15%] desktop-md:order-last mobile:order-first mobile:pt-0 mobile:pb-2 mobile:h-1/5 mobile:w-full flex justify-between pb-3">
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
      <div className="desktop-md:max-h-auto max-h-[85%] flex-1">
        <Sidebar />
      </div>
    </div>
  );
};
