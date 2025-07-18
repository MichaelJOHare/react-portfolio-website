import { useState } from "react";
import { flipSquare, getSquaresToHideDuringPromotion } from "../utils";
import {
  GameManager,
  Highlighter,
  Move,
  Piece,
  PieceType,
  PlayerColor,
  Square,
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
  isBoardFlipped: boolean,
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
    // add highlighter.clearPreviousMoveSquares() maybe?  but don't want to clear array, just hide temporarily so undo/redo works with highlighter
    // maybe pop it and store it in here, then add back in onPromotionSelect
    const squaresToHide = getSquaresToHideDuringPromotion(
      move,
      move.piece.color,
      isBoardFlipped,
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

    executeMove(from.row, from.col, to.row, to.col, playerMoves, type);

    clearPromotionDetails();
    highlighter.addPreviousMoveSquares(from, to);
  };

  const flipPromotionDetails = () => {
    setPromotionPanelState((prev) => {
      if (
        !prev ||
        !prev.promotingPawn?.currentSquare ||
        !prev.promotionSquare
      ) {
        return prev;
      }

      const flippedPawnSquare = flipSquare(prev.promotingPawn.currentSquare);
      const flippedPromotionSquare = flipSquare(prev.promotionSquare);
      const flippedSquaresToHide = prev.squaresToHide.map((sq) =>
        flipSquare(sq),
      );

      return {
        ...prev,
        promotingPawn: {
          ...prev.promotingPawn,
          currentSquare: flippedPawnSquare,
        },
        promotionSquare: flippedPromotionSquare,
        squaresToHide: flippedSquaresToHide,
      };
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

  return {
    ...promotionPanelState,
    onPromotionSelect,
    setPromotionDetails,
    flipPromotionDetails,
    clearPromotionDetails,
  };
};
