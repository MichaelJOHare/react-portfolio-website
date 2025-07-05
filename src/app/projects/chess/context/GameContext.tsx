import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GameManager,
  Highlighter,
  PieceSelector,
  PromotionHandler,
} from "../types";
import { useGameManager } from "../hooks/useGameManager";
import { useHighlighter } from "../hooks/useHighlighter";
import { usePieceSelector } from "../hooks/usePieceSelector";
import { usePromotionHandler } from "../hooks/usePromotionHandler";

interface Props {
  children: React.ReactNode;
}

type GameContextType = {
  gameManager: GameManager;
  highlighter: Highlighter;
  pieceSelector: PieceSelector;
  promotionHandler: PromotionHandler;
  isBoardFlipped: boolean;
  setIsBoardFlipped: (value: boolean) => void;
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
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: Props) => {
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);
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

  const resetGame = () => {
    gameManager.initializeBoard();
    highlighter.clearPreviousMoveSquares();
    pieceSelector.deselectPiece();
    promotionHandler.clearPromotionDetails();
    setIsBoardFlipped(false);
    setStockfishEnabled({
      nnueEnabled: false,
      classicalEnabled: false,
    });
    setComputerOpponentOptions([]);
  };

  useEffect(() => {
    gameManager.initializeBoard();
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameManager,
        highlighter,
        pieceSelector,
        promotionHandler,
        isBoardFlipped,
        setIsBoardFlipped,
        stockfishEnabled,
        setStockfishEnabled,
        computerOpponentOptions,
        setComputerOpponentOptions,
        resetGame,
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
