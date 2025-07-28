import { useState } from "react";
import { getSquaresToHideDuringPromotion } from "../utils";
import {
  GameManager,
  Highlighter,
  Move,
  Piece,
  PieceType,
  PlayerColor,
  Square,
  StockfishHandler,
} from "../types";

type PromotionPanelState = {
  isShown: boolean;
  promotionSquare: Square | undefined;
  promotingPawn: Piece | undefined;
  promotingColor: PlayerColor | undefined;
  squaresToHide: Square[];
};

export const usePromotionHandler = (
  gameManager: GameManager,
  highlighter: Highlighter,
  stockfishHandler: StockfishHandler,
) => {
  const { executeMove, getLegalMoves } = gameManager;
  const [promotionPanelState, setPromotionPanelState] =
    useState<PromotionPanelState>({
      isShown: false,
      promotionSquare: undefined,
      promotingPawn: undefined,
      promotingColor: undefined,
      squaresToHide: [],
    });

  const setPromotionDetails = (move: Move) => {
    stockfishHandler.stopEngineThinking();
    highlighter.clearStockfishBestMoveArrow();
    highlighter.addPreviousMoveSquares(move.from, move.to);
    const squaresToHide = getSquaresToHideDuringPromotion(
      move,
      move.piece.color,
    );

    setPromotionPanelState({
      isShown: true,
      promotionSquare: move.to,
      promotingPawn: move.piece,
      promotingColor: move.piece.color,
      squaresToHide: squaresToHide,
    });
  };

  const onPromotionSelect = (type: PieceType) => {
    const { promotionSquare, promotingPawn } = promotionPanelState;
    if (!promotionSquare || !promotingPawn) return;

    const playerMoves = getLegalMoves();

    const from = promotingPawn.currentSquare;
    const to = promotionSquare;

    executeMove(from, to, playerMoves, false, type);

    clearPromotionDetails();
    stockfishHandler.interruptEngineThinking();
  };

  const clearPromotionDetails = () => {
    setPromotionPanelState({
      isShown: false,
      promotionSquare: undefined,
      promotingPawn: undefined,
      promotingColor: undefined,
      squaresToHide: [],
    });
  };

  return {
    ...promotionPanelState,
    onPromotionSelect,
    setPromotionDetails,
    clearPromotionDetails,
  };
};
