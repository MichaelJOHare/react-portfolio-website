import { emptyArrow } from "../hooks/useHighlighter";
import {
  ArrowProps,
  ChessEngineMove,
  Piece,
  PieceType,
  Square,
} from "../types";
import { createSquare, getSquareFromNotation } from "./square";

export const calculateDepth = (skillLevel: number): number | null =>
  skillLevel < 15 ? Math.ceil((skillLevel + 1) / 5) : 24;

export const isCastlingMove = (
  movingPiece: Piece,
  fromRowCol: Square,
  toRowCol: Square
) => {
  return (
    movingPiece.type === PieceType.KING &&
    Math.abs(toRowCol.col - fromRowCol.col) > 1
  );
};

export const determinePromotionType = (char: string) => {
  switch (char) {
    case "q":
      return PieceType.QUEEN;
    case "r":
      return PieceType.ROOK;
    case "b":
      return PieceType.BISHOP;
    case "n":
      return PieceType.KNIGHT;
    default:
      return undefined;
  }
};

export const getArrowFromMove = (move: ChessEngineMove): ArrowProps => {
  if (move) {
    const from = getSquareFromNotation(move.from);
    const to = getSquareFromNotation(move.to);
    return {
      x1: from.col * 12.5 + 6.25,
      y1: from.row * 12.5 + 6.25,
      x2: to.col * 12.5 + 6.25,
      y2: to.row * 12.5 + 6.25,
      isStockfish: true,
    };
  }
  return emptyArrow();
};

export const convertNotationToSquare = (notation: string | undefined) => {
  if (notation) {
    const col = notation.charCodeAt(0) - "a".charCodeAt(0);
    const row = 8 - parseInt(notation[1]);

    return createSquare(row, col);
  }
};

export const calculateThreadsForNNUE = () => {
  const threads = navigator.hardwareConcurrency || 2;
  let adjusted = threads - 1;

  if (adjusted % 2 !== 0) adjusted -= 1;

  return Math.max(1, adjusted);
};
