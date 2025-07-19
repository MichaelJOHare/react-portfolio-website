import { Board } from "../board/Board";
import { useGame } from "../../context/GameContext";
import { CapturedPieces } from "./CapturedPieces";
import { ChessUIContainer } from "./ChessUIContainer";
import { PlayerColor } from "../../types";

export const ChessGameContainer = () => {
  const { stockfishHandler, stockfishEnabled, isBoardFlipped } = useGame();
  const { evalCentipawn } = stockfishHandler;

  return (
    <div className="desktop-md:flex-row limitedHeight:flex-col flex flex-col justify-center">
      <div className="flex items-center justify-center">
        <div className="desktop-md:w-[70vmin] flex w-[90vmin] flex-col items-center">
          <CapturedPieces
            color={isBoardFlipped ? PlayerColor.BLACK : PlayerColor.WHITE}
          />
          <Board />
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
            className="w-full overflow-hidden bg-neutral-600"
            style={{ height: `${evalCentipawn}%` }}
          >
            <div className="transition-width flex h-full w-full flex-col justify-center bg-slate-100 leading-none duration-500 ease-in-out dark:bg-slate-200"></div>
          </div>
        </div>
      </div>
      <ChessUIContainer />
    </div>
  );
};
