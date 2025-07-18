import { Board } from "../board/Board";
import { useGame } from "../../context/GameContext";
import { CapturedPieces } from "./CapturedPieces";
import { ChessUIContainer } from "./ChessUIContainer";
import { PlayerColor } from "../../types";

export const ChessGameContainer = () => {
  const { stockfishHandler, stockfishEnabled, isBoardFlipped } = useGame();
  const { evalCentipawn } = stockfishHandler;

  return (
    <div className="flex flex-col justify-center desktop-md:flex-row limitedHeight:flex-col">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-[90vmin] desktop-md:w-[70vmin]">
          <CapturedPieces
            color={isBoardFlipped ? PlayerColor.BLACK : PlayerColor.WHITE}
          />
          <Board />
          <CapturedPieces
            color={isBoardFlipped ? PlayerColor.WHITE : PlayerColor.BLACK}
          />
        </div>
        <div
          className={`h-[90vmin] w-5 overflow-hidden bg-neutral-800 border border-slate-800 dark:border-slate-100 border-spacing-0 mx-0.5 desktop-md:h-[70vmin] limitedHeight:h-[90vmin] ${
            isBoardFlipped ? "" : "rotate-180"
          } ${stockfishEnabled ? "visible" : "hidden"}`}
        >
          <div
            className="w-full bg-neutral-600 overflow-hidden"
            style={{ height: `${evalCentipawn}%` }}
          >
            <div className="flex w-full flex-col justify-center h-full bg-slate-100 dark:bg-slate-200 transition-width duration-500 ease-in-out leading-none"></div>
          </div>
        </div>
      </div>
      <ChessUIContainer />
    </div>
  );
};
