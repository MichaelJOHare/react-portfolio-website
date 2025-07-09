import React, { createContext, useContext, useState, useEffect } from "react";
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
  stockfishEnabled: {
    nnueEnabled: boolean;
    classicalEnabled: boolean;
  };
  setStockfishEnabled: (value: {
    nnueEnabled: boolean;
    classicalEnabled: boolean;
  }) => void;
  computerOpponentOptions: number[];
  setComputerOpponentOptions: (options: number[]) => void;
  onResetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children, onResetGame }: Props) => {
  const [isBoardFlipped, setIsBoardFlipped] = useState(false); // add if playing as black -> set to true
  const [stockfishEnabled, setStockfishEnabled] = useState({
    nnueEnabled: false,
    classicalEnabled: false,
  });
  const [computerOpponentOptions, setComputerOpponentOptions] = useState<
    number[]
  >([]);
  const gameManager = useGameManager(isBoardFlipped);
  const highlighter = useHighlighter();
  const promotionHandler = usePromotionHandler(
    gameManager,
    highlighter,
    isBoardFlipped
  );
  const pieceSelector = usePieceSelector(
    gameManager,
    highlighter,
    promotionHandler
  );
  const stockfishHandler = useStockfishHandler();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    gameManager.initializeBoard();
  }, []);
  // only running this on mount, don't need gameManager in dep array

  const toggleFlipBoard = () => {
    setIsBoardFlipped(!isBoardFlipped);
  };

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
