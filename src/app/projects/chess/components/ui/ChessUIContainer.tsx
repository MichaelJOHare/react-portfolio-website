import { useGame } from "../../context/GameContext";
import { UndoRedoButton } from "./sidebar/UndoRedoButton";
import { Sidebar } from "./sidebar/Sidebar";

export const ChessUIContainer = () => {
  const { stockfishHandler, stockfishEnabled } = useGame();
  const { depthPercentage } = stockfishHandler;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mt-4 flex flex-col justify-center ${
          stockfishEnabled ? "w-[93vmin]" : "desktop-md:ml-5 w-[90vmin]"
        }
          desktop-md:w-[35vmin] desktop-md:h-[70vmin] desktop-md:mt-0
          limitedHeight:w-[90vmin] limitedHeight:h-auto limitedHeight:mt-4
          2xl:w-[50vmin]`}
      >
        <div
          className="desktop-md:pt-2 desktop-md:pb-0 desktop-md:h-[10vmin]
            desktop-md:order-last limitedHeight:pt-0 limitedHeight:pb-2
            limitedHeight:h-[20vmin] limitedHeight:order-none flex h-[15vmin]
            w-full justify-between pb-2"
        >
          <UndoRedoButton direction={"left"} />
          <UndoRedoButton direction={"right"} />
        </div>
        <div
          className={`relative flex h-1.5 w-full items-center justify-center
            pr-0.5 ${stockfishEnabled ? "visible" : "hidden"}`}
        >
          <progress
            id="depth-progress"
            role="progressbar"
            aria-label="depth progress"
            className="progress-unfilled:bg-emerald-700
              dark:progress-unfilled:bg-emerald-600
              dark:progress-filled:bg-stone-900 h-1.5 w-[97%] overflow-hidden
              rounded-tl-full rounded-tr-full"
            value={depthPercentage}
            max={100}
          ></progress>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
