import { useGame } from "../../context/GameContext";
import { PlayerColor } from "../../types";
import { Board } from "../board/Board";
import { CapturedPieces } from "./CapturedPieces";
import { UIContainer } from "./UIContainer";

export const ChessContainer = () => {
  const { stockfishHandler, isBoardFlipped, stockfishEnabled } = useGame();
  const { evalCentipawn } = stockfishHandler;

  return (
    <div className="flex items-center justify-center px-2">
      <div
        className={`flex w-full flex-col lg:flex-row lg:justify-center ${stockfishEnabled ? "lg:gap-0" : "gap-4"}`}
      >
        <div className="flex">
          <div className="h-auto w-full">
            <div className="flex justify-items-start pb-1">
              <CapturedPieces
                color={isBoardFlipped ? PlayerColor.BLACK : PlayerColor.WHITE}
              />
            </div>
            <div className="flex">
              <div className="lg:size-chess-size h-auto w-full">
                <Board />
              </div>
              <div
                className={`ml-0.5 w-5 overflow-hidden border border-slate-800 bg-neutral-800 lg:mx-0.5 dark:border-slate-100 ${
                  isBoardFlipped ? "" : "rotate-180"
                } ${stockfishEnabled ? "visible" : "hidden"}`}
              >
                <div
                  className="w-full overflow-hidden bg-neutral-600 transition-all duration-300 ease-in-out"
                  style={{ height: `${evalCentipawn}%` }}
                >
                  <div className="flex size-full flex-col justify-center bg-slate-100 leading-none transition-all duration-300 ease-in-out dark:bg-slate-200"></div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-items-start">
              <CapturedPieces
                color={isBoardFlipped ? PlayerColor.WHITE : PlayerColor.BLACK}
              />
            </div>
          </div>
        </div>
        <UIContainer />
      </div>
    </div>
  );
};
