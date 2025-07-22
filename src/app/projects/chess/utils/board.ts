import {
  Piece,
  Square,
  PieceType,
  MovementStrategy,
  Move,
  PlayerColor,
  PieceRow,
  PieceColumn,
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
  whitePositions: Square[];
  blackPositions: Square[];
  movementStrategy: MovementStrategy;
};

export const defaultBoard = (): Square[][] => {
  return Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => createSquare(row, col, undefined)),
  );
};

export const cloneBoard = (board: Square[][]) =>
  board.map((row) => row.map((square) => ({ ...square })));

export const setupPieces = (): PieceSetup[] => [
  {
    type: PieceType.ROOK,
    whitePositions: [
      { row: PieceRow.W_MAJOR, col: PieceColumn.Q_ROOK },
      { row: PieceRow.W_MAJOR, col: PieceColumn.K_ROOK },
    ],
    blackPositions: [
      { row: PieceRow.B_MAJOR, col: PieceColumn.Q_ROOK },
      { row: PieceRow.B_MAJOR, col: PieceColumn.K_ROOK },
    ],
    movementStrategy: rookMovementStrategy,
  },
  {
    type: PieceType.KNIGHT,
    whitePositions: [
      { row: PieceRow.W_MAJOR, col: PieceColumn.Q_KNIGHT },
      { row: PieceRow.W_MAJOR, col: PieceColumn.K_KNIGHT },
    ],
    blackPositions: [
      { row: PieceRow.B_MAJOR, col: PieceColumn.Q_KNIGHT },
      { row: PieceRow.B_MAJOR, col: PieceColumn.K_KNIGHT },
    ],
    movementStrategy: knightMovementStrategy,
  },
  {
    type: PieceType.BISHOP,
    whitePositions: [
      { row: PieceRow.W_MAJOR, col: PieceColumn.Q_BISHOP },
      { row: PieceRow.W_MAJOR, col: PieceColumn.K_BISHOP },
    ],
    blackPositions: [
      { row: PieceRow.B_MAJOR, col: PieceColumn.Q_BISHOP },
      { row: PieceRow.B_MAJOR, col: PieceColumn.K_BISHOP },
    ],
    movementStrategy: bishopMovementStrategy,
  },
  {
    type: PieceType.QUEEN,
    whitePositions: [{ row: PieceRow.W_MAJOR, col: PieceColumn.QUEEN }],
    blackPositions: [{ row: PieceRow.B_MAJOR, col: PieceColumn.QUEEN }],
    movementStrategy: queenMovementStrategy,
  },
  {
    type: PieceType.KING,
    whitePositions: [{ row: PieceRow.W_MAJOR, col: PieceColumn.KING }],
    blackPositions: [{ row: PieceRow.B_MAJOR, col: PieceColumn.KING }],
    movementStrategy: kingMovementStrategy,
  },
  {
    type: PieceType.PAWN,
    whitePositions: Array.from({ length: 8 }, (_, col) => ({
      row: PieceRow.W_MINOR,
      col,
    })),
    blackPositions: Array.from({ length: 8 }, (_, col) => ({
      row: PieceRow.B_MINOR,
      col,
    })),
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
) => {
  const squaresToHide = [];
  const increment = color === PlayerColor.WHITE ? 1 : -1;

  for (let i = 0; i < 4; i++) {
    squaresToHide.push({
      row: move.to.row + i * increment,
      col: move.to.col,
    });
  }

  squaresToHide.push({ row: move.from.row, col: move.from.col });

  return squaresToHide;
};
