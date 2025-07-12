import { emptyArrow } from "../hooks/useHighlighter";
import {
  ArrowProps,
  ChessEngineMove,
  Piece,
  PieceType,
  Square,
} from "../types";
import { createSquare, getSquareFromNotation } from "./square";

export const calculateDepth = (skillLevel: number): number =>
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

export const getStockfishArrow = (
  move: ChessEngineMove | null,
  isBoardFlipped: boolean
): ArrowProps =>
  move
    ? getArrowFromMove(isBoardFlipped ? mirrorEngineMove(move) : move)
    : emptyArrow();

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

export const mirrorEngineMove = (move: ChessEngineMove): ChessEngineMove => {
  if (move) {
    return {
      from: mirrorSquare(move.from),
      to: mirrorSquare(move.to),
      promotion: move.promotion,
    };
  }
  return null;
};

const mirrorSquare = (square: string): string => {
  const file = square[0];
  const rank = square[1];

  const mirroredFile = String.fromCharCode(
    "h".charCodeAt(0) - (file.charCodeAt(0) - "a".charCodeAt(0))
  );

  const mirroredRank = (9 - parseInt(rank)).toString();

  return `${mirroredFile}${mirroredRank}`;
};

export const convertNotationToSquare = (
  notation: string | undefined,
  isBoardFlipped: boolean
) => {
  if (notation) {
    const col = notation.charCodeAt(0) - "a".charCodeAt(0);
    const row = 8 - parseInt(notation[1]);

    const flippedRow = 7 - row;
    const flippedCol = 7 - col;

    return isBoardFlipped
      ? createSquare(flippedRow, flippedCol)
      : createSquare(row, col);
  }
};

export const calculateThreadsForNNUE = () => {
  const threads = navigator.hardwareConcurrency || 2;
  let adjusted = threads - 1;

  if (adjusted % 2 !== 0) adjusted -= 1;

  return Math.max(1, adjusted);
};
