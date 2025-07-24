import { emptyArrow } from "../hooks/useHighlighter";
import { createSquare, getSquareFromNotation } from "./square";
import {
  ArrowProps,
  ChessEngineMove,
  Piece,
  PieceType,
  Square,
  StrengthLevel,
} from "../types";

export const getConfigFromLevel = (uiLevel: number) => {
  if (uiLevel === StrengthLevel.NONE) {
    return { skill: 20, depth: 24 };
  }

  const clamped = Math.max(1, Math.min(8, uiLevel));
  const internalLevel = Math.round((clamped - 1) * (29 / 7));
  const skill = Math.min(internalLevel, 20);
  const depth = internalLevel < 15 ? Math.ceil((internalLevel + 1) / 5) : 24;

  return { skill, depth };
};

export const isCastlingMove = (
  movingPiece: Piece,
  fromRowCol: Square,
  toRowCol: Square,
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

export const getStockfishArrow = (move: ChessEngineMove | null): ArrowProps =>
  move ? getArrowFromMove(move) : emptyArrow();

export const getArrowFromMove = (move: ChessEngineMove): ArrowProps => {
  if (!move) return emptyArrow();

  const from = getSquareFromNotation(move.from);
  const to = getSquareFromNotation(move.to);

  const calcCoord = (col: number, row: number) => ({
    x: col * 12.5 + 6.25,
    y: row * 12.5 + 6.25,
  });

  const { x: x1, y: y1 } = calcCoord(from.col, from.row);
  const { x: x2, y: y2 } = calcCoord(to.col, to.row);

  return {
    x1,
    y1,
    x2,
    y2,
    isStockfish: true,
  };
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
