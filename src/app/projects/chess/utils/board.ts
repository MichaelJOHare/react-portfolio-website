import {
  Piece,
  Square,
  PieceType,
  MovementStrategy,
  Move,
  PlayerColor,
} from "../types";
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
  positions: Square[];
  movementStrategy: MovementStrategy;
};

export const defaultBoard = (): Square[][] => {
  return Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => createSquare(row, col, undefined)),
  );
};

export const cloneBoard = (board: Square[][]) =>
  board.map((row) => row.map((square) => ({ ...square })));

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
  col: number,
): Piece | undefined => {
  return board[row][col].piece;
};

export const isEmpty = (
  board: Square[][],
  row: number,
  col: number,
): boolean => {
  return !board[row][col].piece;
};

export const isAttackedByOpponent = (
  opponentMoves: Move[],
  targetSquare: Square,
): boolean => {
  return opponentMoves.some((move) => {
    return (
      (move.to.row === targetSquare.row && move.to.col === targetSquare.col) ||
      (move.capturedPiece && move.capturedPiece.type === PieceType.KING)
    );
  });
};

export const isKingInCheck = (opponentMoves: Move[]) => {
  return opponentMoves.some((move) => {
    return move.capturedPiece && move.capturedPiece.type === PieceType.KING;
  });
};

export const getSquaresToHideDuringPromotion = (
  move: Move,
  color: PlayerColor,
  isBoardFlipped: boolean,
) => {
  const squaresToHide = [];
  const increment = (color === PlayerColor.WHITE) === isBoardFlipped ? -1 : 1;

  for (let i = 0; i < 4; i++) {
    squaresToHide.push({
      row: move.to.row + i * increment,
      col: move.to.col,
    });
  }

  squaresToHide.push({ row: move.from.row, col: move.from.col });
  return squaresToHide;
};
