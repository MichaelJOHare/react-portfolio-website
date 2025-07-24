import {
  Move,
  MovementStrategy,
  Piece,
  Square,
  PlayerColor,
  PieceType,
} from "../../types";
import {
  createEnPassantMove,
  createPromotionMove,
  createSquare,
  createStandardMove,
  getPieceAt,
  isEmpty,
} from "../index";

export const pawnMovementStrategy: MovementStrategy = (
  board,
  piece,
  moveHistory,
) => {
  const legalMoves: Move[] = [];
  const { row, col } = piece.currentSquare;
  const direction = piece.color === PlayerColor.WHITE ? -1 : 1;
  const backRank = piece.color === PlayerColor.WHITE ? 0 : 7;
  const startingRow = piece.color === PlayerColor.WHITE ? 6 : 1;
  const rowBeforePromotionRow = piece.color === PlayerColor.WHITE ? 1 : 6;

  const addNormalMoves = (
    row: number,
    col: number,
    direction: number,
    backRank: number,
    piece: Piece,
    board: Square[][],
    legalMoves: Move[],
  ) => {
    const newRow = row + direction;
    if (newRow !== backRank && isEmpty(board, newRow, col)) {
      legalMoves.push(
        createStandardMove(
          piece,
          createSquare(row, col),
          createSquare(newRow, col, piece),
        ),
      );
    }
  };

  const addDoubleMove = (
    row: number,
    col: number,
    direction: number,
    startingRow: number,
    piece: Piece,
    board: Square[][],
    legalMoves: Move[],
  ) => {
    const newRow = row + 2 * direction;
    if (
      row === startingRow &&
      isEmpty(board, row + direction, col) &&
      isEmpty(board, newRow, col)
    ) {
      legalMoves.push(
        createStandardMove(
          piece,
          createSquare(row, col),
          createSquare(newRow, col, piece),
        ),
      );
    }
  };

  const addCaptureMoves = (
    row: number,
    col: number,
    direction: number,
    backRank: number,
    piece: Piece,
    board: Square[][],
    legalMoves: Move[],
  ) => {
    [-1, 1].forEach((colOffset) => {
      const newRow = row + direction;
      const newCol = col + colOffset;
      if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
        const targetSquare = createSquare(newRow, newCol);
        const targetPiece = getPieceAt(board, newRow, newCol);
        const capturedPiece =
          targetPiece && targetPiece.color !== piece.color
            ? targetPiece
            : undefined;
        if (capturedPiece && newRow === backRank) {
          return;
        }
        if (capturedPiece) {
          legalMoves.push(
            createStandardMove(
              piece,
              createSquare(row, col, piece),
              targetSquare,
              capturedPiece,
            ),
          );
        }
      }
    });
  };

  const addEnPassantMoves = (
    row: number,
    col: number,
    piece: Piece,
    board: Square[][],
    moveHistory: Move[],
    legalMoves: Move[],
  ) => {
    if (!moveHistory) {
      return;
    }
    const enPassantStartingRow = piece.color === PlayerColor.WHITE ? 1 : 6;
    const enPassantEndRow = piece.color === PlayerColor.WHITE ? 3 : 4;
    const lastMove = moveHistory[moveHistory.length - 1];

    if (
      lastMove &&
      lastMove.piece.type === PieceType.PAWN &&
      lastMove.from.row === enPassantStartingRow &&
      lastMove.to.row === enPassantEndRow &&
      row === enPassantEndRow &&
      Math.abs(col - lastMove.to.col) === 1
    ) {
      const currentSquare = createSquare(row, col, piece);
      const targetSquare = createSquare(row + direction, lastMove.to.col);

      const capturedPiece = getPieceAt(board, lastMove.to.row, lastMove.to.col);
      if (capturedPiece) {
        const tempMove = createEnPassantMove(
          piece,
          currentSquare,
          targetSquare,
          capturedPiece.currentSquare,
          capturedPiece,
        );
        legalMoves.push(tempMove);
      }
    }
  };

  const addPromotionMoves = (
    row: number,
    col: number,
    piece: Piece,
    board: Square[][],
    legalMoves: Move[],
  ) => {
    const forwardSquare = createSquare(row + direction, col);
    const pieceInFrontOfPawn = getPieceAt(
      board,
      forwardSquare.row,
      forwardSquare.col,
    );

    if (row === rowBeforePromotionRow) {
      if (!pieceInFrontOfPawn) {
        Object.values(PieceType).forEach((promotionType) => {
          if (
            promotionType !== PieceType.PAWN &&
            promotionType !== PieceType.KING
          ) {
            const promotionMove = createPromotionMove(
              piece,
              piece.currentSquare,
              forwardSquare,
              promotionType,
              true,
            );
            legalMoves.push(promotionMove);
          }
        });
      }

      [-1, 1].forEach((colOffset) => {
        const newCol = col + colOffset;
        if (newCol >= 0 && newCol < 8) {
          const capturedPiece = getPieceAt(board, forwardSquare.row, newCol);
          if (capturedPiece && capturedPiece.color !== piece.color) {
            Object.values(PieceType).forEach((promotionType) => {
              if (
                promotionType !== PieceType.PAWN &&
                promotionType !== PieceType.KING
              ) {
                const targetSquare = createSquare(forwardSquare.row, newCol);
                const promotionMove = createPromotionMove(
                  piece,
                  piece.currentSquare,
                  targetSquare,
                  promotionType,
                  true,
                  capturedPiece,
                );
                legalMoves.push(promotionMove);
              }
            });
          }
        }
      });
    }
  };

  addNormalMoves(row, col, direction, backRank, piece, board, legalMoves);
  addDoubleMove(row, col, direction, startingRow, piece, board, legalMoves);
  addCaptureMoves(row, col, direction, backRank, piece, board, legalMoves);
  addEnPassantMoves(row, col, piece, board, moveHistory, legalMoves);
  addPromotionMoves(row, col, piece, board, legalMoves);

  return legalMoves;
};
