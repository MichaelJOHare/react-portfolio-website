import { useGame } from "../../context/GameContext";
import Button from "./Button";
import { GameLog } from "./GameLog";

export const ChessUIContainer = () => {
  const { stockfishEnabled } = useGame();

  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex flex-col justify-center w-[90vmin] mt-4 ${
          stockfishEnabled.classicalEnabled || stockfishEnabled.nnueEnabled
            ? ""
            : "lg:ml-5"
        } lg:w-[35vmin] lg:h-[70vmin] lg:mt-0 2xl:w-[50vmin]`}
      >
        <div className="flex justify-between h-[20vmin] w-full pb-2 lg:pt-2 lg:pb-0 lg:h-[10vmin] lg:order-last">
          <Button direction={"left"} />
          <Button direction={"right"} />
        </div>
        <div
          className={`w-full h-1.5 pr-0.5 flex justify-center items-center relative ${
            stockfishEnabled.classicalEnabled || stockfishEnabled.nnueEnabled
              ? "visible"
              : "hidden"
          }`}
        >
          <progress
            id="depth-progress"
            className="h-1.5 w-[97%] rounded-tl-full rounded-tr-full overflow-hidden progress-filled:bg-green-700 progress-unfilled:bg-stone-900"
            value={0}
            max={100}
          ></progress>
        </div>
        <GameLog />
      </div>
    </div>
  );
};
