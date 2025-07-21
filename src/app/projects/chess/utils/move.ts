import {
  Move,
  EnPassantMove,
  CastlingMove,
  PromotionMove,
  MoveType,
  Piece,
  PieceType,
  Square,
  PlayerColor,
} from "../types";
import {
  isAttackedByOpponent,
  isEmpty,
  getMovementStrategyFromType,
  createSquare,
} from ".";
import { pawnMovementStrategy } from "./strategies";

/*
 ***** MOVE CREATION *****
 */

export const createStandardMove = (
  piece: Piece,
  from: Square,
  to: Square,
  capturedPiece?: Piece,
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
  rookTo: Square,
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
  capturedPiece: Piece,
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
  capturedPiece?: Piece,
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
  capturedPiece: Piece | undefined,
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
      const newCapturedPiece = {
        ...capturedPiece,
        isAlive: false,
      };
      piecesToUpdate.push(newCapturedPiece);
    }
  }
  return piecesToUpdate;
};

export const executeEnPassantMove = (
  move: Move,
  board: Square[][],
  epCapturedPiece: Piece | undefined,
): Piece[] => {
  const piecesToUpdate: Piece[] = [];
  const enPassantMove = move as EnPassantMove;
  const updatedPawn = {
    ...enPassantMove.piece,
    currentSquare: enPassantMove.to,
  };
  board[enPassantMove.from.row][enPassantMove.from.col].piece = undefined;
  if (updatedPawn) {
    board[enPassantMove.to.row][enPassantMove.to.col].piece = updatedPawn;
    piecesToUpdate.push(updatedPawn);
    if (epCapturedPiece) {
      board[enPassantMove.capturedPieceSquare.row][
        enPassantMove.capturedPieceSquare.col
      ].piece = undefined;
      const newEpCapturedPiece = {
        ...epCapturedPiece,
        isAlive: false,
      };
      piecesToUpdate.push(newEpCapturedPiece);
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
  capturedPiecePromo: Piece | undefined,
): Piece[] => {
  const piecesToUpdate: Piece[] = [];
  const promotionMove = move as PromotionMove;
  const moveStrat = getMovementStrategyFromType(promotionMove.promotionType);
  const promotedPawn = moveStrat && {
    ...promotionMove.piece,
    currentSquare: promotionMove.to,
    type: promotionMove.promotionType,
    movementStrategy: moveStrat,
    wasPromoted: true,
  };
  board[promotionMove.from.row][promotionMove.from.col].piece = undefined;
  if (promotedPawn) {
    board[move.to.row][move.to.col].piece = promotedPawn;
    piecesToUpdate.push(promotedPawn);
    if (capturedPiecePromo) {
      const newCapturedPiecePromo = {
        ...capturedPiecePromo,
        isAlive: false,
      };
      piecesToUpdate.push(newCapturedPiecePromo);
    }
  }
  return piecesToUpdate;
};

/*
 ***** MOVE EXECUTION *****
 */

/*
 ***** UNDO MOVE EXECUTION *****
 */

export const undoStandardMove = (
  move: Move,
  board: Square[][],
  capturedPiece: Piece | undefined,
): Piece[] => {
  const piecesToUpdate: Piece[] = [];

  const updatedPiece = {
    ...move.piece,
    currentSquare: move.from,
    hasMoved: false, // needs to check if hasMoved was set to true on last move only, if not then keep it set to true
  }; //                 probably make hasMoved an object that holds start and end square to check here

  board[move.from.row][move.from.col].piece = updatedPiece;
  board[move.to.row][move.to.col].piece = undefined;
  piecesToUpdate.push(updatedPiece);

  if (capturedPiece) {
    const revivedPiece = {
      ...capturedPiece,
      isAlive: true,
      currentSquare: move.to,
    };
    board[move.to.row][move.to.col].piece = revivedPiece;
    piecesToUpdate.push(revivedPiece);
  }

  return piecesToUpdate;
};

export const undoEnPassantMove = (
  move: Move,
  board: Square[][],
  epCapturedPiece: Piece | undefined,
): Piece[] => {
  const enPassantMove = move as EnPassantMove;
  const piecesToUpdate: Piece[] = [];

  const updatedPawn = {
    ...enPassantMove.piece,
    currentSquare: enPassantMove.from,
  };

  board[enPassantMove.to.row][enPassantMove.to.col].piece = undefined;
  board[enPassantMove.from.row][enPassantMove.from.col].piece = updatedPawn;
  piecesToUpdate.push(updatedPawn);

  if (epCapturedPiece) {
    const revivedPiece = {
      ...epCapturedPiece,
      isAlive: true,
      currentSquare: enPassantMove.capturedPieceSquare,
    };
    board[enPassantMove.capturedPieceSquare.row][
      enPassantMove.capturedPieceSquare.col
    ].piece = revivedPiece;
    piecesToUpdate.push(revivedPiece);
  }

  return piecesToUpdate;
};

export const undoCastlingMove = (move: Move, board: Square[][]): Piece[] => {
  const castlingMove = move as CastlingMove;

  const updatedKing = {
    ...castlingMove.piece,
    currentSquare: castlingMove.kingFrom,
    hasMoved: false, // undoing castle move means it was legal
  };
  const updatedRook = {
    ...castlingMove.rook,
    currentSquare: castlingMove.rookFrom,
    hasMoved: false,
  };

  board[castlingMove.kingTo.row][castlingMove.kingTo.col].piece = undefined;
  board[castlingMove.rookTo.row][castlingMove.rookTo.col].piece = undefined;

  board[castlingMove.kingFrom.row][castlingMove.kingFrom.col].piece =
    updatedKing;
  board[castlingMove.rookFrom.row][castlingMove.rookFrom.col].piece =
    updatedRook;

  return [updatedKing, updatedRook];
};

export const undoPromoMove = (
  move: Move,
  board: Square[][],
  capturedPiecePromo: Piece | undefined,
): Piece[] => {
  const promotionMove = move as PromotionMove;
  const piecesToUpdate: Piece[] = [];

  const unPromotedPawn = {
    ...promotionMove.piece,
    currentSquare: promotionMove.from,
    type: PieceType.PAWN,
    movementStrategy: pawnMovementStrategy,
    wasPromoted: false,
  };

  board[promotionMove.to.row][promotionMove.to.col].piece = undefined;
  board[promotionMove.from.row][promotionMove.from.col].piece = unPromotedPawn;
  piecesToUpdate.push(unPromotedPawn);

  if (capturedPiecePromo) {
    const revivedPiece = {
      ...capturedPiecePromo,
      isAlive: true,
      currentSquare: promotionMove.to,
    };
    board[promotionMove.to.row][promotionMove.to.col].piece = revivedPiece;
    piecesToUpdate.push(revivedPiece);
  }

  return piecesToUpdate;
};

/*
 ***** UNDO MOVE EXECUTION *****
 */

/*
 ***** DO AND UNDO MOVE BY TYPE *****
 */

export const executeMoveByType = (
  move: Move,
  board: Square[][],
  halfMoveClock: number,
  fullMoveNumber: number,
): {
  updatedPieces: Piece[];
  capturedPieces: Piece[];
  newHalfMoveClock: number;
  newFullMoveNumber: number;
} => {
  const updatedCapturedPieces: Piece[] = [];
  let updatedPieces: Piece[] = [];

  if (move.capturedPiece) {
    const captured = { ...move.capturedPiece, isAlive: false };
    updatedCapturedPieces.push(captured);
  }

  switch (move.type) {
    case MoveType.STNDRD:
      updatedPieces = executeStandardMove(move, board, move.capturedPiece);
      break;
    case MoveType.CASTLE:
      updatedPieces = executeCastlingMove(move, board);
      break;
    case MoveType.EP:
      updatedPieces = executeEnPassantMove(move, board, move.capturedPiece);
      break;
    case MoveType.PROMO:
      updatedPieces = executePromoMove(move, board, move.capturedPiece);
      break;
  }

  const newHalfMoveClock =
    move.piece.type === PieceType.PAWN || move.capturedPiece
      ? 0
      : halfMoveClock + 1;

  const newFullMoveNumber =
    move.piece.color === PlayerColor.BLACK
      ? fullMoveNumber + 1
      : fullMoveNumber;

  return {
    updatedPieces,
    capturedPieces: updatedCapturedPieces,
    newHalfMoveClock,
    newFullMoveNumber,
  };
};

export const undoMoveByType = (
  move: Move,
  board: Square[][],
  capturedPieces: Piece[],
  halfMoveClock: number,
  fullMoveNumber: number,
): {
  updatedPieces: Piece[];
  capturedPieces: Piece[];
  newHalfMoveClock: number;
  newFullMoveNumber: number;
} => {
  let updatedCapturedPieces: Piece[] = [...capturedPieces];
  let updatedPieces: Piece[] = [];

  switch (move.type) {
    case MoveType.STNDRD:
      updatedPieces = undoStandardMove(move, board, move.capturedPiece);
      break;
    case MoveType.CASTLE:
      updatedPieces = undoCastlingMove(move, board);
      break;
    case MoveType.EP:
      updatedPieces = undoEnPassantMove(move, board, move.capturedPiece);
      break;
    case MoveType.PROMO:
      updatedPieces = undoPromoMove(move, board, move.capturedPiece);
      break;
  }

  if (move.capturedPiece) {
    const captured = { ...move.capturedPiece, isAlive: true };
    updatedCapturedPieces = capturedPieces.filter(
      (piece) => piece.id !== captured.id,
    );
  }

  const newHalfMoveClock =
    move.piece.type === PieceType.PAWN || move.capturedPiece
      ? halfMoveClock
      : halfMoveClock - 1;

  const newFullMoveNumber =
    move.piece.color === PlayerColor.BLACK
      ? fullMoveNumber - 1
      : fullMoveNumber;

  return {
    updatedPieces,
    capturedPieces: updatedCapturedPieces,
    newHalfMoveClock,
    newFullMoveNumber,
  };
};

/*
 ***** DO AND UNDO MOVE BY TYPE *****
 */

/*
 ***** CASTLING MOVE VALIDATION *****
 */

export const isValidCastlingMove = (
  move: CastlingMove,
  opponentMoves: Move[],
  board: Square[][],
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
      !isSquareOccupiedOrAttacked(kingSquare.row, kingSquare.col + 2) &&
      !isAttackedByOpponent(opponentMoves, kingSquare)
    ) {
      return true;
    }
    return false;
  } else {
    if (
      !isSquareOccupiedOrAttacked(kingSquare.row, kingSquare.col - 1) &&
      !isSquareOccupiedOrAttacked(kingSquare.row, kingSquare.col - 2) &&
      !isAttackedByOpponent(opponentMoves, kingSquare)
    ) {
      return true;
    }
    return false;
  }
};

/*
 ***** CASTLING MOVE VALIDATION *****
 */
