import { v4 as uuidv4 } from "uuid";
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
  hasMoved?: boolean
): Piece => ({
  id: uuidv4(),
  player,
  type,
  color,
  currentSquare,
  movementStrategy,
  isAlive,
  hasMoved,
});

export const getMovementStrategyFromType = (
  pieceType: PieceType
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

export function getPieceUnicode(type: PieceType) {
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
  }
}
