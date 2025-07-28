import { useState } from "react";
import { Square } from "../types";

export type AnimatingPiece = {
  id: string;
  startSquare: Square;
  endSquare: Square;
  onComplete: () => void;
};

export const usePieceAnimator = () => {
  const [animatingPieces, setAnimatingPieces] = useState<
    Map<string, AnimatingPiece>
  >(new Map());

  const startAnimation = (
    pieceId: string,
    startSquare: Square,
    endSquare: Square,
    onComplete: () => void,
  ) => {
    const animationId = `${startSquare.row}-${startSquare.col}`;

    setAnimatingPieces((prev) =>
      new Map(prev).set(animationId, {
        id: pieceId,
        startSquare,
        endSquare,
        onComplete,
      }),
    );
  };

  const completeAnimation = (square: Square) => {
    const animationId = `${square.row}-${square.col}`;
    setAnimatingPieces((prev) => {
      const animatingPiece = prev.get(animationId);
      if (animatingPiece) {
        const newMap = new Map(prev);
        newMap.delete(animationId);
        animatingPiece.onComplete();
        return newMap;
      }
      return prev;
    });
  };

  const getAnimatingPiece = (square: Square): AnimatingPiece | undefined => {
    const animationId = `${square.row}-${square.col}`;
    return animatingPieces.get(animationId);
  };

  return {
    startAnimation,
    getAnimatingPiece,
    completeAnimation,
    animatingPieces,
  };
};
