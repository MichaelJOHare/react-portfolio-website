import { useGame } from "../../context/GameContext";
import { UndoRedoButton } from "./sidebar/UndoRedoButton";
import { Sidebar } from "./sidebar/Sidebar";

export const ChessUIContainer = () => {
  const { stockfishHandler, stockfishEnabled } = useGame();
  const { depthPercentage } = stockfishHandler;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex flex-col justify-center mt-4 ${
          stockfishEnabled ? "w-[93vmin]" : "w-[90vmin] desktop-md:ml-5"
        } desktop-md:w-[35vmin] desktop-md:h-[70vmin] desktop-md:mt-0 2xl:w-[50vmin] limitedHeight:w-[90vmin] limitedHeight:h-auto limitedHeight:mt-4`}
      >
        <div className="flex justify-between h-[15vmin] w-full pb-2 desktop-md:pt-2 desktop-md:pb-0 desktop-md:h-[10vmin] desktop-md:order-last limitedHeight:pt-0 limitedHeight:pb-2 limitedHeight:h-[20vmin] limitedHeight:order-none">
          <UndoRedoButton direction={"left"} />
          <UndoRedoButton direction={"right"} />
        </div>
        <div
          className={`w-full h-1.5 pr-0.5 flex justify-center items-center relative ${
            stockfishEnabled ? "visible" : "hidden"
          }`}
        >
          <progress
            id="depth-progress"
            role="progressbar"
            aria-label="depth progress"
            className="h-1.5 w-[97%] rounded-tl-full rounded-tr-full overflow-hidden progress-unfilled:bg-emerald-700 dark:progress-unfilled:bg-emerald-600 dark:progress-filled:bg-stone-900"
            value={depthPercentage}
            max={100}
          ></progress>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
