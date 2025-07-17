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
      className={`absolute top-0 left-0 w-full mt-2 pb-2 flex items-center justify-center transition-opacity desktop-md:h-full desktop-md:mt-0 desktop-md:pb-0 limitedHeight:h-auto ${
        isOpen ? "opacity-100 z-20" : "opacity-0 pointer-events-none z-0 "
      }`}
    >
      <div className="flex size-full relative">
        <div className="absolute right-3 top-2">
          <button
            className="rounded-3xl bg-rose-600 hover:bg-rose-800"
            onClick={onClose}
          >
            <CloseModalIcon className="size-10 text-neutral-200 scale-[99%]" />
          </button>
        </div>
        <div
          ref={menuRef}
          className="flex flex-col bg-neutral-300 rounded-lg p-4 w-full h-full dark:bg-gray-700"
        >
          <h1 className="flex self-center text-2xl pb-4 2xl:text-3xl limitedHeight:text-2xl">
            Stockfish Options
          </h1>
          <div className="flex flex-col grow justify-around desktop-md:flex-col">
            <div className="flex flex-col">
              <ul className="pb-2 self-center">
                <StockfishAnalysisToggle />
              </ul>
            </div>
            <StockfishVersionMenu />
            <div className="mt-2 border-t dark:border-gray-300" />
            <div className="flex flex-col">
              <h2 className="text-2xl font-medium self-center">
                Play Versus Computer
              </h2>
              <h3 className="self-center pt-2 pb-1 font-bold text-xl">
                Strength level
              </h3>
              <ul className="self-center grid grid-cols-4 gap-2">
                {strengthLevels.map((level) => (
                  <button
                    type="button"
                    key={level}
                    className={`size-12 text-neutral-100 hover:shadow-md  px-1 text-4xl rounded-lg ${
                      level === strengthLevel
                        ? "bg-emerald-500 dark:bg-emerald-400 hover:shadow-neutral-600 dark:hover:shadow-slate-900"
                        : "bg-neutral-500 dark:bg-teal-700 hover:bg-neutral-800 dark:hover:bg-teal-800 hover:shadow-neutral-600 dark:hover:shadow-slate-900"
                    }`}
                    onClick={() => setStrengthLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </ul>
              <h3 className="self-center pt-2 pb-1 font-bold text-xl">
                Choose Color
              </h3>
              <ul className="self-center flex gap-3">
                <button
                  type="button"
                  className={`hover:shadow-md rounded-lg ${
                    colorChoice === 0
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : "bg-neutral-500 dark:bg-teal-700 hover:bg-neutral-600 dark:hover:bg-teal-800 hover:shadow-neutral-600 dark:hover:shadow-slate-900"
                  }`}
                  onClick={() => setColorChoice(0)}
                >
                  <WhiteKing className="w-18 h-18 scale-[99%]" />
                </button>
                <button
                  type="button"
                  className={`hover:shadow-md rounded-lg ${
                    colorChoice === 2
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : "bg-neutral-500 dark:bg-teal-700 hover:bg-neutral-600 dark:hover:bg-teal-800 hover:shadow-neutral-600 dark:hover:shadow-slate-900"
                  }`}
                  onClick={() => setColorChoice(2)}
                >
                  <RandomKing className="w-18 h-18 scale-[99%]" />
                </button>
                <button
                  type="button"
                  className={`rounded-lg hover:shadow-md ${
                    colorChoice === 3
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : "bg-neutral-500 dark:bg-teal-700 hover:bg-neutral-600 dark:hover:bg-teal-800 hover:shadow-neutral-600 dark:hover:shadow-slate-900"
                  }`}
                  onClick={() => setColorChoice(1)}
                >
                  <BlackKing className="w-18 h-18 scale-[99%]" />
                </button>
              </ul>
            </div>
            <div className="pt-2">
              <button
                type="button"
                className="h-14 w-full text-3xl font-medium pb-1 text-neutral-100 hover:shadow-sm dark:hover:shadow-md bg-zinc-700 dark:bg-teal-700 hover:bg-zinc-800 dark:hover:bg-teal-800 hover:shadow-zinc-800 dark:hover:shadow-slate-900 rounded-lg"
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
