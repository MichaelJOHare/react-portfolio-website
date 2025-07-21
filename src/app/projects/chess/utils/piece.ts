import {
  Player,
  PieceType,
  PlayerColor,
  Square,
  MovementStrategy,
  Piece,
} from "../types";
import {
  bishopMovementStrategy,
  knightMovementStrategy,
  queenMovementStrategy,
  rookMovementStrategy,
} from "./strategies";

export const createPiece = (
  player: Player,
  type: PieceType,
  color: PlayerColor,
  currentSquare: Square,
  movementStrategy: MovementStrategy,
  isAlive: boolean,
  hasMoved?: boolean,
  wasPromoted?: boolean,
): Piece => ({
  id: `${color}_${type}_${currentSquare.row}_${currentSquare.col}`,
  player,
  type,
  color,
  currentSquare,
  movementStrategy,
  isAlive,
  hasMoved,
  wasPromoted,
});

export const clonePiece = (piece: Piece, currentSquare: Square): Piece => ({
  ...piece,
  currentSquare,
});

export const getMovementStrategyFromType = (
  pieceType: PieceType,
): MovementStrategy | undefined => {
  let moveStrat: MovementStrategy | undefined;
  switch (pieceType) {
    case PieceType.QUEEN:
      moveStrat = queenMovementStrategy;
      break;
    case PieceType.ROOK:
      moveStrat = rookMovementStrategy;
      break;
    case PieceType.BISHOP:
      moveStrat = bishopMovementStrategy;
      break;
    case PieceType.KNIGHT:
      moveStrat = knightMovementStrategy;
      break;
    default:
      moveStrat = undefined;
      break;
  }
  return moveStrat;
};

export const getPieceUnicode = (type: PieceType) => {
  switch (type) {
    case PieceType.KING:
      return "♚";
    case PieceType.QUEEN:
      return "♛";
    case PieceType.ROOK:
      return "♜";
    case PieceType.BISHOP:
      return "♝";
    case PieceType.KNIGHT:
      return "♞";
    case PieceType.PAWN:
      return "♟";
    default:
      return "";
  }
};
