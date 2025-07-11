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
  stockfishEnabled: {
    nnueEnabled: boolean;
    classicalEnabled: boolean;
  };
  setStockfishEnabled: (value: {
    nnueEnabled: boolean;
    classicalEnabled: boolean;
  }) => void;
  computerOpponentOptions: {
    strengthLevel: number;
    colorChoice: number;
  };
  setComputerOpponentOptions: (value: {
    strengthLevel: number;
    colorChoice: number;
  }) => void;
  setVersion: (version: "sf-16" | "sf-17") => void;
  onResetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children, onResetGame }: Props) => {
  const hasStartedWorker = useRef(false);
  const hasFlippedForComputer = useRef(false);
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);
  const isBoardFlippedRef = useRef(isBoardFlipped);
  const [version, setVersion] = useState<"sf-16" | "sf-17">("sf-16");
  const [stockfishEnabled, setStockfishEnabled] = useState({
    nnueEnabled: false,
    classicalEnabled: false,
  });
  const [computerOpponentOptions, setComputerOpponentOptions] = useState({
    strengthLevel: -1,
    colorChoice: -1,
  });
  const isAnalysisEnabled =
    stockfishEnabled.nnueEnabled || stockfishEnabled.classicalEnabled;

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
    isBoardFlippedRef,
    stockfishEnabled.classicalEnabled,
    stockfishEnabled.nnueEnabled,
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
  useEffect(() => {
    gameManager.initializeBoard();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  // useEffect for auto flip when choosing black pieces
  useEffect(() => {
    isBoardFlippedRef.current = isBoardFlipped;
  }, [isBoardFlipped]);

  // useEffect because worker needs to start and terminate based on state
  useEffect(() => {
    if (!isAnalysisEnabled && !isPlayingVsComputer) {
      stockfishHandler.terminate();
      return;
    }

    if (isPlayingVsComputer) {
      setStockfishEnabled((prev) => {
        if (!prev.nnueEnabled && !prev.classicalEnabled) return prev;
        return { nnueEnabled: false, classicalEnabled: false };
      });

      const isBlack = computerOpponentOptions.colorChoice === 1;
      if (isBlack && !hasFlippedForComputer.current) {
        setIsBoardFlipped(true);
        gameManager.flipPiecesOnBoard();
        hasFlippedForComputer.current = true;
      }
    }

    if (!hasStartedWorker.current && !stockfishHandler.isRunning()) {
      stockfishHandler.startWorker(version);
      hasStartedWorker.current = true;
    }
  }, [
    computerOpponentOptions, // maybe silence this linter, idk how to limit calls while satisfying exhaustive deps
    stockfishEnabled,
    version,
    isAnalysisEnabled,
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
