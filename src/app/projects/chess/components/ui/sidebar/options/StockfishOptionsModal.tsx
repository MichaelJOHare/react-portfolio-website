import { useRef, useEffect, useState } from "react";
import CloseModalIcon from "@/assets/icons/close-modal-icon.svg";
import { StockfishAnalysisToggle } from "./StockfishAnalysisToggle";
import { PlayVersusComputer } from "./PlayVersusComputer";
import { StockfishVersionMenu } from "./StockfishVersionMenu";
import { useGame } from "@/app/projects/chess/context/GameContext";
import {
  ColorChoice,
  NO_CHOICE,
  PlayerType,
  StockfishVersion,
} from "../../../../types";

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
    engineOptions,
    setEngineOptions,
    toggleFlipBoard,
  } = useGame();
  const { startWorker, isRunning, terminateWorker } = stockfishHandler;
  const menuRef = useRef<HTMLDivElement>(null);
  const [version, setVersion] = useState(StockfishVersion.SF16);
  const [tempColorChoice, setTempColorChoice] = useState(NO_CHOICE);
  const [tempStrengthLevel, setTempStrengthLevel] = useState(NO_CHOICE);

  const whitePlayer = gameManager.players[0];
  const blackPlayer = gameManager.players[1];
  const colorChoice = engineOptions.colorChoice;
  const strengthLevel = engineOptions.strengthChoice;

  const isPlaying = colorChoice !== NO_CHOICE && strengthLevel !== NO_CHOICE;
  const optionUnselected =
    tempColorChoice === NO_CHOICE || tempStrengthLevel === NO_CHOICE;

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

  const handlePlayClicked = (actualColor: number) => {
    if (isRunning()) {
      terminateWorker();
    }
    setStockfishEnabled(false);
    startWorker(StockfishVersion.SF16);
    onClose();
    setEngineOptions({
      strengthChoice: tempStrengthLevel,
      colorChoice: actualColor,
    });
  };

  const handleStopClicked = () => {
    whitePlayer.type = PlayerType.HUMAN;
    blackPlayer.type = PlayerType.HUMAN;
    terminateWorker();
    setEngineOptions({
      colorChoice: NO_CHOICE,
      strengthChoice: NO_CHOICE,
    });
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
      setTempColorChoice(NO_CHOICE);
      setTempStrengthLevel(NO_CHOICE);
    }
  }, [isOpen, isPlaying]);

  return (
    <div
      className={`desktop-md:mt-0 desktop-md:pb-0 mobile:min-h-148 absolute top-0 left-0 mt-2 flex size-full items-center justify-center pb-2 transition-opacity duration-200 ${
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
          className="flex size-full flex-col rounded-lg bg-neutral-300 p-4 dark:bg-gray-700"
        >
          <div className="flex h-full flex-col pt-3">
            <div className="flex h-1/4 flex-col justify-evenly">
              <div className="flex flex-col self-center">
                <StockfishAnalysisToggle
                  onAnalysisToggle={handleAnalysisToggle}
                  disabled={isPlaying}
                />
              </div>
              <StockfishVersionMenu
                version={version}
                onVersionSelect={handleVersionSelect}
              />
            </div>
            <div className="my-2 border-t dark:border-gray-300" />
            <div className="flex h-3/4 flex-col">
              <PlayVersusComputer
                tempStrengthLevel={tempStrengthLevel}
                tempColorChoice={tempColorChoice}
                isPlaying={isPlaying}
                optionUnselected={optionUnselected}
                onStrengthLevelChange={setTempStrengthLevel}
                onColorChoiceChange={setTempColorChoice}
                onPlayToggle={handlePlayToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
