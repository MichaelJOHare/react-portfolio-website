import { useGame } from "../../context/GameContext";
import { PlayerColor } from "../../types";
import { Board } from "../board/Board";
import { CapturedPieces } from "./CapturedPieces";
import { UIContainer } from "./UIContainer";

export const ChessContainer = () => {
  const { stockfishHandler, isBoardFlipped, stockfishEnabled } = useGame();
  const { evalCentipawn } = stockfishHandler;

  return (
    <div className="narrow:px-2 flex items-center justify-center">
      <div
        className={`desktop-md:flex-row mobile:flex-col flex flex-col ${stockfishEnabled ? "desktop-md:gap-0" : "gap-4"}`}
      >
        <div className="flex">
          <div>
            <div className="flex w-full justify-items-start pb-1">
              <CapturedPieces
                color={isBoardFlipped ? PlayerColor.BLACK : PlayerColor.WHITE}
              />
            </div>
            <div className="size-chess-size">
              <Board />
            </div>
            <div className="flex w-full justify-items-start">
              <CapturedPieces
                color={isBoardFlipped ? PlayerColor.WHITE : PlayerColor.BLACK}
              />
            </div>
          </div>
          <div
            className={`h-chess-h mobile:max-h-eval-h desktop-md:mx-0.5 mt-8 ml-0.5 w-5 overflow-hidden border border-slate-800 bg-neutral-800 dark:border-slate-100 ${
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
        <UIContainer />
      </div>
    </div>
  );
};
