import { useRef, useEffect, useState } from "react";
import BlackKing from "@/assets/icons/black-king.svg";
import WhiteKing from "@/assets/icons/white-king.svg";
import RandomKing from "@/assets/icons/random-king.svg";
import CloseModalIcon from "@/assets/icons/close-modal-icon.svg";
import { useGame } from "../../../context/GameContext";
import { StockfishAnalysisToggle } from "./StockfishAnalysisToggle";
import { StockfishVersionMenu } from "./StockfishVersionMenu";
import {
  ColorChoice,
  NO_SELECTION,
  PlayerType,
  StockfishVersion,
} from "../../../types";

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
    stockfishHandler,
    isBoardFlipped,
    stockfishEnabled,
    setStockfishEnabled,
    colorChoice,
    strengthLevel,
    setColorChoice,
    setStrengthLevel,
    toggleFlipBoard,
  } = useGame();
  const menuRef = useRef<HTMLDivElement>(null);
  const { startWorker, isRunning, terminateWorker } = stockfishHandler;
  const [version, setVersion] = useState(StockfishVersion.SF16);
  const [tempStrengthLevel, setTempStrengthLevel] = useState(NO_SELECTION);
  const [tempColorChoice, setTempColorChoice] = useState(ColorChoice.NONE);
  const strengthLevels = [1, 2, 3, 4, 5, 6, 7, 8];
  const whitePlayer = gameManager.players[0];
  const blackPlayer = gameManager.players[1];
  const isPlaying =
    colorChoice !== ColorChoice.NONE && strengthLevel !== NO_SELECTION;
  const optionUnselected =
    tempColorChoice === ColorChoice.NONE || tempStrengthLevel === NO_SELECTION;

  const handlePlayToggle = () => {
    if (!isPlaying) {
      const actualColor =
        tempColorChoice === ColorChoice.RANDOM
          ? Math.random() < 0.5
            ? ColorChoice.WHITE
            : ColorChoice.BLACK
          : tempColorChoice;

      const isBlack = actualColor === ColorChoice.BLACK;
      if (isBlack) {
        whitePlayer.type = PlayerType.COMPUTER;
      } else {
        blackPlayer.type = PlayerType.COMPUTER;
      }

      if ((isBlack && !isBoardFlipped) || (!isBlack && isBoardFlipped)) {
        toggleFlipBoard();
      }

      handlePlayClicked(actualColor);
    } else {
      handleStopClicked();
    }
  };

  const handleAnalysisToggle = (sfEnabled: boolean) => {
    if (sfEnabled && !isRunning()) {
      startWorker(version);
    } else if (!sfEnabled) {
      terminateWorker();
    }
  };

  const handleVersionSelect = (versionInput: StockfishVersion) => {
    if (versionInput !== version && isRunning()) {
      terminateWorker();
    }
    setVersion(versionInput);
    if (stockfishEnabled || isPlaying) {
      startWorker(versionInput);
    }
  };

  const handlePlayClicked = (actualColor: ColorChoice) => {
    if (isRunning()) {
      terminateWorker();
    }
    setStockfishEnabled(false);
    setStrengthLevel(tempStrengthLevel);
    setColorChoice(actualColor);
    onClose();
    startWorker(StockfishVersion.SF16);
  };

  const handleStopClicked = () => {
    whitePlayer.type = PlayerType.HUMAN;
    blackPlayer.type = PlayerType.HUMAN;
    setColorChoice(ColorChoice.NONE);
    setStrengthLevel(NO_SELECTION);
    terminateWorker();
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
    if (isOpen && !isPlaying) {
      setTempColorChoice(ColorChoice.NONE);
      setTempStrengthLevel(NO_SELECTION);
    }
  }, [isOpen, isPlaying]);

  const getOptionButtonClassName = ({
    value,
    selectedValue,
    isPlaying,
  }: {
    value: number;
    selectedValue: number;
    isPlaying: boolean;
  }) => {
    const isSelected = selectedValue === value;
    const isHoverable = !isSelected && !isPlaying;

    const base =
      "rounded-lg hover:shadow-md disabled:shadow-none disabled:cursor-not-allowed";
    const selected = "bg-emerald-500 dark:bg-emerald-400";
    const unselected = isHoverable
      ? "bg-neutral-500 hover:bg-neutral-600 hover:shadow-neutral-600 dark:bg-teal-700 dark:hover:bg-teal-800 dark:hover:shadow-slate-900"
      : "bg-neutral-500 dark:bg-teal-700";

    return `${base} ${isSelected ? selected : unselected}`;
  };

  return (
    <div
      className={`desktop-md:h-full desktop-md:mt-0 desktop-md:pb-0 limitedHeight:h-auto absolute top-0 left-0 mt-2 flex w-full items-center justify-center pb-2 transition-opacity duration-200 ${
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
          className="flex h-full w-full flex-col rounded-lg bg-neutral-300 p-4 dark:bg-gray-700"
        >
          <h1 className="limitedHeight:text-2xl flex self-center pb-4 text-2xl 2xl:text-3xl">
            Stockfish Options
          </h1>
          <div className="desktop-md:flex-col flex grow flex-col justify-around">
            <div className="flex flex-col self-center pb-2">
              <StockfishAnalysisToggle
                onAnalysisToggle={handleAnalysisToggle}
                disabled={isPlaying}
              />
            </div>
            <StockfishVersionMenu
              version={version}
              onVersionSelect={handleVersionSelect}
            />
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
                    disabled={isPlaying}
                    className={`size-12 px-1 text-4xl text-neutral-100 ${getOptionButtonClassName(
                      {
                        value: level,
                        selectedValue: tempStrengthLevel,
                        isPlaying,
                      },
                    )}`}
                    onClick={() => setTempStrengthLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </ul>
              <h3 className="self-center pt-2 pb-1 text-xl font-bold">
                Choose Color
              </h3>
              <ul className="flex gap-3 self-center">
                {[
                  {
                    Icon: WhiteKing,
                    value: ColorChoice.WHITE,
                  },
                  {
                    Icon: RandomKing,
                    value: ColorChoice.RANDOM,
                  },
                  {
                    Icon: BlackKing,
                    value: ColorChoice.BLACK,
                  },
                ].map(({ Icon, value }) => (
                  <button
                    key={value}
                    type="button"
                    disabled={isPlaying}
                    className={getOptionButtonClassName({
                      value,
                      selectedValue: tempColorChoice,
                      isPlaying,
                    })}
                    onClick={() => setTempColorChoice(value)}
                  >
                    <Icon className="h-18 w-18 scale-[99%]" />
                  </button>
                ))}
              </ul>
            </div>
            <div className="pt-2">
              <button
                type="button"
                disabled={optionUnselected}
                className="h-14 w-full rounded-lg bg-neutral-600 pb-1 text-3xl font-medium text-neutral-100 not-disabled:bg-emerald-600 hover:shadow-md hover:shadow-neutral-600 not-disabled:hover:bg-emerald-500 disabled:cursor-not-allowed disabled:shadow-none dark:bg-teal-800 dark:hover:shadow-slate-900"
                onClick={handlePlayToggle}
              >
                {isOpen && isPlaying ? "Stop" : "Play"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
