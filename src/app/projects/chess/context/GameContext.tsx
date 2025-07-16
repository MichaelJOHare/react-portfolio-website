import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  GameManager,
  Highlighter,
  PieceSelector,
  PromotionHandler,
  StockfishHandler,
} from "../types";
import { useGameManager } from "../hooks/useGameManager";
import { useHighlighter } from "../hooks/useHighlighter";
import { usePieceSelector } from "../hooks/usePieceSelector";
import { usePromotionHandler } from "../hooks/usePromotionHandler";
import { useStockfishHandler } from "../hooks/useStockfishHandler";

interface Props {
  children: React.ReactNode;
  onResetGame: () => void;
}

type GameContextType = {
  gameManager: GameManager;
  highlighter: Highlighter;
  pieceSelector: PieceSelector;
  promotionHandler: PromotionHandler;
  stockfishHandler: StockfishHandler;
  isBoardFlipped: boolean;
  toggleFlipBoard: () => void;
  stockfishEnabled: boolean;
  setStockfishEnabled: (value: boolean) => void;
  computerOpponentOptions: {
    strengthLevel: number;
    colorChoice: number;
  };
  setComputerOpponentOptions: (value: {
    strengthLevel: number;
    colorChoice: number;
  }) => void;
  version: "sf-16" | "sf-17";
  setVersion: (version: "sf-16" | "sf-17") => void;
  onResetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children, onResetGame }: Props) => {
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);
  const [version, setVersion] = useState<"sf-16" | "sf-17">("sf-16");
  const [stockfishEnabled, setStockfishEnabled] = useState(false);
  const [computerOpponentOptions, setComputerOpponentOptions] = useState({
    strengthLevel: -1,
    colorChoice: -1,
  });

  const isPlayingVsComputer =
    computerOpponentOptions.colorChoice !== -1 &&
    computerOpponentOptions.strengthLevel !== -1;
  const gameManager = useGameManager(isBoardFlipped);
  const highlighter = useHighlighter();
  const promotionHandler = usePromotionHandler(
    gameManager,
    highlighter,
    isBoardFlipped
  );
  const stockfishHandler = useStockfishHandler(
    gameManager,
    highlighter,
    version,
    isBoardFlipped,
    stockfishEnabled,
    computerOpponentOptions.colorChoice,
    computerOpponentOptions.strengthLevel
  );
  const pieceSelector = usePieceSelector(
    gameManager,
    highlighter,
    promotionHandler,
    stockfishHandler
  );

  const toggleFlipBoard = () => {
    setIsBoardFlipped(!isBoardFlipped);
  };

  // useEffect because only running this once on mount, don't need gameManager in dep array
  //        can maybe get rid of this if I set gameState equal to what initializeBoard does
  useEffect(() => {
    gameManager.initializeBoard();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  // useEffect because async worker needs to start and terminate based on state
  useEffect(() => {
    if (!stockfishEnabled && !isPlayingVsComputer) {
      stockfishHandler.terminate();
      return;
    }

    if (isPlayingVsComputer) {
      setStockfishEnabled(false);
    }

    if (!stockfishHandler.isRunning()) {
      stockfishHandler.startWorker(version);
    }
  }, [
    // maybe silence this linter, idk how to limit calls while satisfying exhaustive deps
    stockfishEnabled,
    version,
    isPlayingVsComputer,
  ]);

  return (
    <GameContext.Provider
      value={{
        gameManager,
        highlighter,
        pieceSelector,
        promotionHandler,
        stockfishHandler,
        isBoardFlipped,
        toggleFlipBoard,
        stockfishEnabled,
        setStockfishEnabled,
        computerOpponentOptions,
        setComputerOpponentOptions,
        version,
        setVersion,
        onResetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
