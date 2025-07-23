import { useGame } from "../../context/GameContext";
import { UndoRedoButton } from "./sidebar/UndoRedoButton";
import { Sidebar } from "./sidebar/Sidebar";

export const ChessUIContainer = () => {
  const { stockfishHandler, stockfishEnabled } = useGame();
  const { depthPercentage } = stockfishHandler;

  return (
    <div className="flex items-center justify-center py-4">
      <div
        className={`flex h-[70vmin] flex-col justify-center ${
          stockfishEnabled
            ? "desktop-md:w-[30vmin] mr-6 w-[90vmin]"
            : "desktop-md:w-[33vmin] desktop-md:pl-6 w-[93vmin]"
        } limitedHeight:w-[90vmin] limitedHeight:h-auto desktop-w-h-breakpoint:w-[33vmin] 2xl:w-[50vmin]`}
      >
        <div className="desktop-md:pt-2 desktop-md:pb-0 desktop-md:h-[10vmin] desktop-md:order-last limitedHeight:pt-0 limitedHeight:pb-2 limitedHeight:h-[20vmin] limitedHeight:order-0 flex h-[15vmin] w-full justify-between pb-2">
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
        <div className="min-h-0 flex-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
