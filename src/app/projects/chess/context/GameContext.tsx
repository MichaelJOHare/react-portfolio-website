import React, { createContext, useContext, useState, useEffect } from "react";
import { useGameManager } from "../hooks/useGameManager";
import { useHighlighter } from "../hooks/useHighlighter";
import { usePieceSelector } from "../hooks/usePieceSelector";
import { usePromotionHandler } from "../hooks/usePromotionHandler";
import { useStockfishHandler } from "../hooks/useStockfishHandler";
import {
  ColorChoice,
  GameManager,
  Highlighter,
  NO_SELECTION,
  PieceSelector,
  PromotionHandler,
  StockfishHandler,
} from "../types";

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
  setStockfishEnabled: (val: boolean) => void;
  colorChoice: ColorChoice;
  strengthLevel: number;
  setColorChoice: (val: ColorChoice) => void;
  setStrengthLevel: (val: number) => void;
  onResetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children, onResetGame }: Props) => {
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);
  const [stockfishEnabled, setStockfishEnabled] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState(NO_SELECTION);
  const [colorChoice, setColorChoice] = useState(ColorChoice.NONE);
  const gameManager = useGameManager();
  const highlighter = useHighlighter(isBoardFlipped);
  const stockfishHandler = useStockfishHandler(
    gameManager,
    highlighter,
    colorChoice,
    strengthLevel,
  );
  const promotionHandler = usePromotionHandler(
    gameManager,
    highlighter,
    stockfishHandler,
  );
  const pieceSelector = usePieceSelector(
    gameManager,
    highlighter,
    promotionHandler,
    stockfishHandler,
  );

  const toggleFlipBoard = () => {
    setIsBoardFlipped(!isBoardFlipped);
  };

  // useEffect because only running this once on mount, don't need gameManager in dep array
  useEffect(() => {
    gameManager.initializeBoard();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

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
        colorChoice,
        strengthLevel,
        setColorChoice,
        setStrengthLevel,
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
