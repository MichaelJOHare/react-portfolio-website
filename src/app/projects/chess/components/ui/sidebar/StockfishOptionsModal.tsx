import { useRef, useEffect, useState } from "react";
import BlackKing from "@/assets/icons/black-king.svg";
import WhiteKing from "@/assets/icons/white-king.svg";
import RandomKing from "@/assets/icons/random-king.svg";
import CloseModalIcon from "@/assets/icons/close-modal-icon.svg";
import { useGame } from "../../../context/GameContext";
import { StockfishAnalysisToggle } from "./StockfishAnalysisToggle";
import { StockfishVersionMenu } from "./StockfishVersionMenu";
import { PlayerType } from "../../../types";

type StockfishOptionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const StockfishOptionsModal = ({
  isOpen,
  onClose,
}: StockfishOptionsModalProps) => {
  const {
    gameManager,
    highlighter,
    isBoardFlipped,
    setComputerOpponentOptions,
    toggleFlipBoard,
  } = useGame();
  const menuRef = useRef<HTMLDivElement>(null);
  const [strengthLevel, setStrengthLevel] = useState(-1);
  const [colorChoice, setColorChoice] = useState(-1);
  const [playClicked, setPlayClicked] = useState(false);
  const strengthLevels = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePlayToggle = () => {
    if (!playClicked) {
      const actualColor =
        colorChoice === 2 ? (Math.random() < 0.5 ? 0 : 1) : colorChoice;

      const isBlack = actualColor === 1;
      if (isBlack) {
        gameManager.players[0].type = PlayerType.COMPUTER;
      } else {
        gameManager.players[1].type = PlayerType.COMPUTER;
      }

      if (isBlack !== isBoardFlipped) {
        toggleFlipBoard();
        gameManager.flipPiecesOnBoard();
        highlighter.flipAllHighlights();
      }

      setComputerOpponentOptions({
        strengthLevel,
        colorChoice: actualColor,
      });
      onClose();
    } else {
      setComputerOpponentOptions({ strengthLevel: -1, colorChoice: -1 });
    }
    setPlayClicked((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setStrengthLevel(-1);
      setColorChoice(-1);
      setPlayClicked(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`desktop-md:h-full desktop-md:mt-0 desktop-md:pb-0
        limitedHeight:h-auto absolute top-0 left-0 mt-2 flex w-full items-center
        justify-center pb-2 transition-opacity ${
          isOpen ? "z-20 opacity-100" : "pointer-events-none z-0 opacity-0"
        }`}
    >
      <div className="relative flex size-full">
        <div className="absolute top-2 right-3">
          <button
            className="rounded-3xl bg-rose-600 hover:bg-rose-800"
            onClick={onClose}
          >
            <CloseModalIcon className="size-10 scale-[99%] text-neutral-200" />
          </button>
        </div>
        <div
          ref={menuRef}
          className="flex h-full w-full flex-col rounded-lg bg-neutral-300 p-4
            dark:bg-gray-700"
        >
          <h1
            className="limitedHeight:text-2xl flex self-center pb-4 text-2xl
              2xl:text-3xl"
          >
            Stockfish Options
          </h1>
          <div className="desktop-md:flex-col flex grow flex-col justify-around">
            <div className="flex flex-col">
              <ul className="self-center pb-2">
                <StockfishAnalysisToggle />
              </ul>
            </div>
            <StockfishVersionMenu />
            <div className="mt-2 border-t dark:border-gray-300" />
            <div className="flex flex-col">
              <h2 className="self-center text-2xl font-medium">
                Play Versus Computer
              </h2>
              <h3 className="self-center pt-2 pb-1 text-xl font-bold">
                Strength level
              </h3>
              <ul className="grid grid-cols-4 gap-2 self-center">
                {strengthLevels.map((level) => (
                  <button
                    type="button"
                    key={level}
                    className={`size-12 rounded-lg px-1 text-4xl
                    text-neutral-100 hover:shadow-md ${
                      level === strengthLevel
                        ? `bg-emerald-500 hover:shadow-neutral-600
                          dark:bg-emerald-400 dark:hover:shadow-slate-900`
                        : `bg-neutral-500 hover:bg-neutral-800
                          hover:shadow-neutral-600 dark:bg-teal-700
                          dark:hover:bg-teal-800 dark:hover:shadow-slate-900`
                    }`}
                    onClick={() => setStrengthLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </ul>
              <h3 className="self-center pt-2 pb-1 text-xl font-bold">
                Choose Color
              </h3>
              <ul className="flex gap-3 self-center">
                <button
                  type="button"
                  className={`rounded-lg hover:shadow-md ${
                    colorChoice === 0
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : `bg-neutral-500 hover:bg-neutral-600
                        hover:shadow-neutral-600 dark:bg-teal-700
                        dark:hover:bg-teal-800 dark:hover:shadow-slate-900`
                    }`}
                  onClick={() => setColorChoice(0)}
                >
                  <WhiteKing className="h-18 w-18 scale-[99%]" />
                </button>
                <button
                  type="button"
                  className={`rounded-lg hover:shadow-md ${
                    colorChoice === 2
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : `bg-neutral-500 hover:bg-neutral-600
                        hover:shadow-neutral-600 dark:bg-teal-700
                        dark:hover:bg-teal-800 dark:hover:shadow-slate-900`
                    }`}
                  onClick={() => setColorChoice(2)}
                >
                  <RandomKing className="h-18 w-18 scale-[99%]" />
                </button>
                <button
                  type="button"
                  className={`rounded-lg hover:shadow-md ${
                    colorChoice === 1
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : `bg-neutral-500 hover:bg-neutral-600
                        hover:shadow-neutral-600 dark:bg-teal-700
                        dark:hover:bg-teal-800 dark:hover:shadow-slate-900`
                    }`}
                  onClick={() => setColorChoice(1)}
                >
                  <BlackKing className="h-18 w-18 scale-[99%]" />
                </button>
              </ul>
            </div>
            <div className="pt-2">
              <button
                type="button"
                className={`h-14 w-full bg-zinc-700 pb-1 text-3xl font-medium
                  text-neutral-100 hover:shadow-sm dark:bg-teal-700
                  dark:hover:shadow-md ${
                    colorChoice !== -1 && strengthLevel !== -1
                      ? "hover:bg-emerald-500 dark:hover:bg-emerald-400"
                      : "hover:bg-zinc-800 dark:hover:bg-teal-800"
                  } rounded-lg hover:shadow-zinc-800
                  dark:hover:shadow-slate-900`}
                onClick={handlePlayToggle}
              >
                {playClicked ? "Stop" : "Play"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
