import { Piece, Square, PieceType, MovementStrategy } from "../types";
import { createSquare } from "./square";
import {
  rookMovementStrategy,
  knightMovementStrategy,
  bishopMovementStrategy,
  queenMovementStrategy,
  kingMovementStrategy,
  pawnMovementStrategy,
} from "./strategies";

type PieceSetup = {
  type: PieceType;
  positions: { row: number; col: number }[];
  movementStrategy: MovementStrategy;
};

export const defaultBoard = (): Square[][] => {
  return Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => createSquare(row, col, undefined))
  );
};

export const setupPieces = (isBoardFlipped: boolean): PieceSetup[] => [
  {
    type: PieceType.ROOK,
    positions: [
      { row: 0, col: 0 },
      { row: 0, col: 7 },
    ],
    movementStrategy: rookMovementStrategy,
  },
  {
    type: PieceType.KNIGHT,
    positions: [
      { row: 0, col: 1 },
      { row: 0, col: 6 },
    ],
    movementStrategy: knightMovementStrategy,
  },
  {
    type: PieceType.BISHOP,
    positions: [
      { row: 0, col: 2 },
      { row: 0, col: 5 },
    ],
    movementStrategy: bishopMovementStrategy,
  },
  {
    type: PieceType.QUEEN,
    positions: isBoardFlipped ? [{ row: 0, col: 4 }] : [{ row: 0, col: 3 }],
    movementStrategy: queenMovementStrategy,
  },
  {
    type: PieceType.KING,
    positions: isBoardFlipped ? [{ row: 0, col: 3 }] : [{ row: 0, col: 4 }],
    movementStrategy: kingMovementStrategy,
  },
  {
    type: PieceType.PAWN,
    positions: Array.from({ length: 8 }, (_, col) => ({ row: 1, col })),
    movementStrategy: pawnMovementStrategy,
  },
];

export const getPieceAt = (
  board: Square[][],
  row: number,
  col: number
): Piece | undefined => {
  return board[row][col].piece;
};

export const isEmpty = (
  board: Square[][],
  row: number,
  col: number
): boolean => {
  return !board[row][col].piece;
};
