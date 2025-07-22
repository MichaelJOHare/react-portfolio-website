import {
  Player,
  PieceType,
  PlayerColor,
  Square,
  MovementStrategy,
  Piece,
  NOT_MOVED,
} from "../types";
import {
  bishopMovementStrategy,
  knightMovementStrategy,
  queenMovementStrategy,
  rookMovementStrategy,
  kingMovementStrategy,
  pawnMovementStrategy,
} from "./strategies";

export const createPiece = (
  player: Player,
  type: PieceType,
  color: PlayerColor,
  currentSquare: Square,
  movementStrategy: MovementStrategy,
  isAlive: boolean,
  firstMoveNumber: number,
  wasPromoted?: boolean,
): Piece => ({
  id: `${color}_${type}_${currentSquare.row}_${currentSquare.col}`,
  player,
  type,
  color,
  currentSquare,
  movementStrategy,
  isAlive,
  firstMoveNumber,
  wasPromoted,
});

export const initializePieces = (
  board: Square[][],
  piecesByPlayer: Map<string, Piece[]>,
  positions: Square[],
  player: Player,
  color: PlayerColor,
  type: PieceType,
  movementStrategy: MovementStrategy,
) => {
  const newBoard = board.map((row) => row.map((square) => ({ ...square })));
  const newPiecesByPlayer = new Map(piecesByPlayer);

  positions.forEach(({ row, col }) => {
    const square = newBoard[row][col];

    const piece = createPiece(
      player,
      type,
      color,
      square,
      movementStrategy,
      true,
      NOT_MOVED,
    );

    newBoard[row][col].piece = piece;
    const playerPieces = newPiecesByPlayer.get(player.id) || [];
    newPiecesByPlayer.set(player.id, [...playerPieces, piece]);
  });

  return { board: newBoard, piecesByPlayer: newPiecesByPlayer };
};

export const clonePiece = (piece: Piece, currentSquare: Square): Piece => ({
  ...piece,
  currentSquare,
});

export const havePiecesMoved = (pieces: Piece[]): boolean => {
  return pieces.some((piece) => piece.firstMoveNumber !== NOT_MOVED);
};

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
    case PieceType.KING:
      moveStrat = kingMovementStrategy;
      break;
    case PieceType.PAWN:
      moveStrat = pawnMovementStrategy;
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
