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
      <div className="desktop-md:flex-row mobile:flex-col narrow:gap-2 flex flex-col gap-4">
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
          <div
            className={`h-chess-h mx-0.5border-spacing-0 w-5 overflow-hidden border border-slate-800 bg-neutral-800 dark:border-slate-100 ${
              isBoardFlipped ? "" : "rotate-180"
            } ${stockfishEnabled ? "visible" : "hidden"}`}
          >
            <div
              className="w-full overflow-hidden bg-neutral-600 transition-all duration-300 ease-in-out"
              style={{ height: `${evalCentipawn}%` }}
            >
              <div className="flex h-full w-full flex-col justify-center bg-slate-100 leading-none transition-all duration-300 ease-in-out dark:bg-slate-200"></div>
            </div>
          </div>
        </div>
        <UIContainer />
      </div>
    </div>
  );
};
