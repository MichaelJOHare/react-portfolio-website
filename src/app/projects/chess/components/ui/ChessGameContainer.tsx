import { Board } from "../board/Board";
import { useGame } from "../../context/GameContext";
import { CapturedPieces } from "./CapturedPieces";
import { ChessUIContainer } from "./ChessUIContainer";
import { PlayerColor } from "../../types";

export const ChessGameContainer = () => {
  const { stockfishHandler, stockfishEnabled, isBoardFlipped } = useGame();
  const { evalCentipawn } = stockfishHandler;

  return (
    <div className="desktop-md:flex-row limitedHeight:flex-col limitedHeight:min-h-0 limitedHeight:py-2 desktop-md:items-center flex min-h-[92vh] flex-col justify-center">
      <div className="flex items-center justify-center">
        <div className="desktop-md:w-[70vmin] limitedHeight:w-[90vmin] flex w-[90vmin] flex-col items-center justify-center">
          <CapturedPieces
            color={isBoardFlipped ? PlayerColor.BLACK : PlayerColor.WHITE}
          />
          <div className="flex items-center justify-center">
            <Board />
          </div>
          <CapturedPieces
            color={isBoardFlipped ? PlayerColor.WHITE : PlayerColor.BLACK}
          />
        </div>
        <div
          className={`desktop-md:h-[70vmin] limitedHeight:h-[90vmin] mx-0.5 h-[90vmin] w-5 border-spacing-0 overflow-hidden border border-slate-800 bg-neutral-800 dark:border-slate-100 ${
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
      <ChessUIContainer />
    </div>
  );
};
