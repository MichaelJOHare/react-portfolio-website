import { useGame } from "../../context/GameContext";
import { UndoRedoButton } from "./sidebar/UndoRedoButton";
import { GameLog } from "./sidebar/Sidebar";

export const ChessUIContainer = () => {
  const { stockfishHandler, stockfishEnabled } = useGame();
  const { depthPercentage } = stockfishHandler;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex flex-col justify-center w-[90vmin] mt-4 ${
          stockfishEnabled ? "mr-5" : "lg:ml-5"
        } lg:w-[35vmin] lg:h-[70vmin] lg:mt-0 2xl:w-[50vmin] limitedHeight:w-[90vmin] limitedHeight:h-auto limitedHeight:mt-4`}
      >
        <div className="flex justify-between h-[20vmin] w-full pb-2 lg:pt-2 lg:pb-0 lg:h-[10vmin] lg:order-last limitedHeight:pt-0 limitedHeight:pb-2 limitedHeight:h-[20vmin] limitedHeight:order-none">
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
            className="h-1.5 w-[97%] rounded-tl-full rounded-tr-full overflow-hidden progress-unfilled:bg-green-700 progress-filled:bg-stone-900"
            value={depthPercentage}
            max={100}
          ></progress>
        </div>
        <GameLog />
      </div>
    </div>
  );
};
