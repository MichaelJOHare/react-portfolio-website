import { useRef, useEffect, useState } from "react";
import BlackKing from "@/assets/icons/black-king.svg";
import WhiteKing from "@/assets/icons/white-king.svg";
import RandomKing from "@/assets/icons/random-king.svg";
import CloseModalIcon from "@/assets/icons/close-modal-icon.svg";
import { useGame } from "../../../context/GameContext";
import { StockfishAnalysisToggles } from "./StockfishAnalysisToggles";
import { StockfishVersionMenu } from "./StockfishVersionMenu";

type StockfishOptionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const StockfishOptionsModal = ({
  isOpen,
  onClose,
}: StockfishOptionsModalProps) => {
  const { setComputerOpponentOptions } = useGame();
  const menuRef = useRef<HTMLDivElement>(null);
  const [strengthLevel, setStrengthLevel] = useState(-1);
  const [colorChoice, setColorChoice] = useState(-1);
  const [playClicked, setPlayClicked] = useState(false);
  const strengthLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handlePlayToggle = () => {
    if (!playClicked) {
      const actualColor =
        colorChoice === 2 ? (Math.random() < 0.5 ? 0 : 1) : colorChoice;
      setComputerOpponentOptions({
        strengthLevel: strengthLevel,
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
      className={`absolute top-0 left-0 w-full mt-2 pb-2 flex items-center justify-center transition-opacity lg:h-full limitedHeight:h-auto ${
        isOpen ? "opacity-100 z-20" : "opacity-0 pointer-events-none z-0 "
      }`}
    >
      <div className="size-full relative">
        <div className="absolute right-3 top-2">
          <button className="rounded-3xl hover:bg-slate-300" onClick={onClose}>
            <CloseModalIcon className="size-10" />
          </button>
        </div>
        <div
          ref={menuRef}
          className="flex flex-col bg-white rounded-lg p-4 w-full h-full dark:bg-gray-700"
        >
          <h1 className="flex self-center text-2xl pb-4 pr-4 2xl:text-3xl limitedHeight:text-2xl">
            Stockfish Options
          </h1>
          <div className="flex flex-col justify-around lg:flex-col">
            <StockfishVersionMenu />
            <div className="flex flex-col">
              <h2 className="pt-4 text-2xl underline self-center">
                Stockfish Analysis
              </h2>
              <ul className="pt-2 self-center">
                <StockfishAnalysisToggles />
              </ul>
            </div>
            <div className="flex flex-col">
              <h2 className="pt-4 text-2xl underline self-center">
                Play Versus Computer
              </h2>
              <h3 className="self-center pt-2 font-bold text-xl">
                Strength level
              </h3>
              <ul className="self-center grid grid-cols-5 gap-1">
                {strengthLevels.map((level) => (
                  <button
                    type="button"
                    key={level}
                    className={`border px-1 text-2xl hover:bg-slate-300 hover:text-slate-600 rounded-lg ${
                      level === strengthLevel ? "bg-slate-300" : ""
                    }`}
                    onClick={() => setStrengthLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </ul>
              <h3 className="self-center pt-2 font-bold text-xl">
                Choose Color
              </h3>
              <ul className="self-center">
                <button
                  type="button"
                  className={`border hover:bg-slate-300 rounded-lg ${
                    colorChoice === 0 ? "bg-slate-300" : ""
                  }`}
                  onClick={() => setColorChoice(0)}
                >
                  <WhiteKing />
                </button>
                <button
                  type="button"
                  className={`border mx-2 hover:bg-slate-300 rounded-lg ${
                    colorChoice === 2 ? "bg-slate-300" : ""
                  }`}
                  onClick={() => setColorChoice(2)}
                >
                  <RandomKing />
                </button>
                <button
                  type="button"
                  className={`border hover:bg-slate-300 rounded-lg ${
                    colorChoice === 1 ? "bg-slate-300" : ""
                  }`}
                  onClick={() => setColorChoice(1)}
                >
                  <BlackKing />
                </button>
              </ul>
              <div className="pt-2">
                <button
                  type="button"
                  className="text-3xl font-medium pb-1 border w-full hover:bg-slate-300 rounded-lg"
                  onClick={handlePlayToggle}
                >
                  {playClicked ? "Stop" : "Play"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
