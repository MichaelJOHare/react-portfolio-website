import { useState } from "react";
import {
  GameManager,
  Move,
  Piece,
  PieceType,
  PlayerColor,
  Square,
} from "../types";
import { createPromotionMove, getSquaresToHideDuringPromotion } from "../utils";

type PromotionPanelState = {
  isShown: boolean;
  promotionSquare: Square | undefined;
  promotingPawn: Piece | undefined;
  promotingColor: PlayerColor | undefined;
  squaresToHide: Square[];
};

export const usePromotionPanel = (
  isBoardFlipped: boolean,
  gameManager: GameManager
) => {
  const { executeMove, getLegalMoves, board } = gameManager;
  const [promotionPanelState, setPromotionPanelState] =
    useState<PromotionPanelState>({
      isShown: false,
      promotionSquare: undefined,
      promotingPawn: undefined,
      promotingColor: undefined,
      squaresToHide: [],
    });

  const togglePromotionPanel = (isShown: boolean) => {
    setPromotionPanelState((prev) => ({
      ...prev,
      isShown,
    }));
  };

  const setPromotionDetails = (move: Move) => {
    const squaresToHide = getSquaresToHideDuringPromotion(
      move,
      move.piece.color,
      isBoardFlipped
    );
    setPromotionPanelState({
      isShown: true,
      promotionSquare: move.to,
      promotingPawn: move.piece,
      promotingColor: move.piece.color,
      squaresToHide: squaresToHide,
    });
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

  const onPromotionSelect = (type: PieceType) => {
    const promotionSquare = promotionPanelState.promotionSquare;
    const promotingPawn = promotionPanelState.promotingPawn;
    if (!promotionSquare || !promotingPawn) return;

    const capturedPiece = board[promotionSquare.row][promotionSquare.col].piece;
    const playerMoves = getLegalMoves();
    const promotionMove = createPromotionMove(
      promotingPawn,
      promotingPawn.currentSquare,
      promotionSquare,
      type,
      true,
      capturedPiece
    );
    executeMove(
      promotionMove.from.row,
      promotionMove.from.col,
      promotionMove.to.row,
      promotionMove.to.col,
      playerMoves,
      type
    );
    clearPromotionDetails();
    togglePromotionPanel(false);
  };

  return {
    ...promotionPanelState,
    onPromotionSelect,
    togglePromotionPanel,
    setPromotionDetails,
    clearPromotionDetails,
  };
};
