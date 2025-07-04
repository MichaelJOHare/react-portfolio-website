import {
  Move,
  EnPassantMove,
  CastlingMove,
  PromotionMove,
  MoveType,
  Piece,
  PieceType,
  Square,
} from "../types";
import { isAttackedByOpponent, isEmpty } from "./board";
import { getMovementStrategyFromType } from "./piece";
import { createSquare } from "./square";

/*
 ***** MOVE CREATION *****
 */

export const createStandardMove = (
  piece: Piece,
  from: Square,
  to: Square,
  capturedPiece?: Piece
): Move => ({
  type: MoveType.STNDRD,
  from,
  to,
  capturedPiece,
  piece,
});

export const createCastlingMove = (
  king: Piece,
  rook: Piece,
  kingFrom: Square,
  kingTo: Square,
  rookFrom: Square,
  rookTo: Square
): CastlingMove => ({
  type: MoveType.CASTLE,
  from: kingFrom,
  to: kingTo,
  capturedPiece: undefined,
  piece: king,
  rook: rook,
  kingFrom,
  kingTo,
  rookFrom,
  rookTo,
});

export const createEnPassantMove = (
  piece: Piece,
  from: Square,
  to: Square,
  capturedPieceSquare: Square,
  capturedPiece: Piece
): EnPassantMove => ({
  type: MoveType.EP,
  piece: piece,
  from: from,
  to: to,
  capturedPieceSquare: capturedPieceSquare,
  capturedPiece: capturedPiece,
});

export const createPromotionMove = (
  piece: Piece,
  from: Square,
  to: Square,
  promotionType: PieceType,
  isPromotion?: boolean,
  capturedPiece?: Piece
): PromotionMove => ({
  type: MoveType.PROMO,
  piece: piece,
  from: from,
  to: to,
  promotionType: promotionType,
  isPromotion: isPromotion,
  capturedPiece: capturedPiece,
});

/*
 ***** MOVE CREATION *****
 */

/*
 ***** MOVE EXECUTION *****
 */

export const executeStandardMove = (
  move: Move,
  board: Square[][],
  capturedPiece: Piece | undefined
): Piece[] => {
  const piecesToUpdate: Piece[] = [];
  const updatedPiece = {
    ...move.piece,
    currentSquare: move.to,
    hasMoved: true,
  };
  board[move.from.row][move.from.col].piece = undefined;
  if (updatedPiece) {
    board[move.to.row][move.to.col].piece = updatedPiece;
    piecesToUpdate.push(updatedPiece);
    if (capturedPiece) {
      capturedPiece.isAlive = false;
      piecesToUpdate.push(capturedPiece);
    }
  }
  return piecesToUpdate;
};

export const executeEnPassantMove = (
  move: Move,
  board: Square[][],
  epCapturedPiece: Piece | undefined
): Piece[] => {
  const piecesToUpdate: Piece[] = [];
  const enPassantMove = move as EnPassantMove;
  const updatedPawn = {
    ...enPassantMove.piece,
    currentSquare: enPassantMove.to,
  };
  board[enPassantMove.from.row][enPassantMove.from.col].piece = undefined;
  if (updatedPawn) {
    board[move.to.row][move.to.col].piece = updatedPawn;
    piecesToUpdate.push(updatedPawn);
    if (epCapturedPiece) {
      epCapturedPiece.isAlive = false;
      piecesToUpdate.push(epCapturedPiece);
    }
  }
  return piecesToUpdate;
};

export const executeCastlingMove = (move: Move, board: Square[][]): Piece[] => {
  const castlingMove = move as CastlingMove;
  const updatedKing = {
    ...castlingMove.piece,
    currentSquare: castlingMove.kingTo,
    hasMoved: true,
  };
  const updatedRook = {
    ...castlingMove.rook,
    currentSquare: castlingMove.rookTo,
    hasMoved: true,
  };

  board[castlingMove.kingFrom.row][castlingMove.kingFrom.col].piece = undefined;
  board[castlingMove.rookFrom.row][castlingMove.rookFrom.col].piece = undefined;

  board[castlingMove.kingTo.row][castlingMove.kingTo.col].piece = updatedKing;
  board[castlingMove.rookTo.row][castlingMove.rookTo.col].piece = updatedRook;

  return [updatedKing, updatedRook];
};

export const executePromoMove = (
  move: Move,
  board: Square[][],
  capturedPiecePromo: Piece | undefined
): Piece[] => {
  const piecesToUpdate: Piece[] = [];
  const promotionMove = move as PromotionMove;
  const moveStrat = getMovementStrategyFromType(promotionMove.promotionType);
  const promotedPawn = moveStrat && {
    ...promotionMove.piece,
    currentSquare: promotionMove.to,
    type: promotionMove.promotionType,
    movementStrategy: moveStrat,
  };
  board[promotionMove.from.row][promotionMove.from.col].piece = undefined;
  if (promotedPawn) {
    board[move.to.row][move.to.col].piece = promotedPawn;
    piecesToUpdate.push(promotedPawn);
    if (capturedPiecePromo) {
      capturedPiecePromo.isAlive = false;
      piecesToUpdate.push(capturedPiecePromo);
    }
  }
  return piecesToUpdate;
};

/*
 ***** MOVE EXECUTION *****
 */

/*
 ***** CASTLING MOVE VALIDATION *****
 */

export const isValidCastlingMove = (
  move: CastlingMove,
  opponentMoves: Move[],
  board: Square[][]
) => {
  const king = move.piece;
  const kingSquare = king.currentSquare;

  const isSquareOccupiedOrAttacked = (row: number, col: number) => {
    if (
      !isEmpty(board, row, col) ||
      isAttackedByOpponent(opponentMoves, createSquare(row, col))
    ) {
      return true;
    }
    return false;
  };

  if (kingSquare.col - move.kingTo.col < 0) {
    if (
      !isSquareOccupiedOrAttacked(kingSquare.row, kingSquare.col + 1) &&
      !isSquareOccupiedOrAttacked(kingSquare.row, kingSquare.col + 2)
    ) {
      return true;
    }
    return false;
  } else {
    if (
      !isSquareOccupiedOrAttacked(kingSquare.row, kingSquare.col - 1) &&
      !isSquareOccupiedOrAttacked(kingSquare.row, kingSquare.col - 2)
    ) {
      return true;
    }
    return false;
  }
};

/*
 ***** CASTLING MOVE VALIDATION *****
 */
