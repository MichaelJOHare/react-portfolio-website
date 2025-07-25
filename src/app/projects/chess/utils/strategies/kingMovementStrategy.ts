import { MovementStrategy, Piece, Square, Move } from "../../types";
import {
  createSquare,
  createStandardMove,
  createCastlingMove,
  getPieceAt,
  havePiecesMoved,
} from "../.";

export const kingMovementStrategy: MovementStrategy = (board, piece) => {
  const legalMoves: Move[] = [];
  const row = piece.currentSquare.row;
  const col = piece.currentSquare.col;

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const addCastlingMoves = (
    board: Square[][],
    king: Piece,
    legalMoves: Move[],
  ) => {
    const rookPositions = { kingSideRookCol: 7, queenSideRookCol: 0 };
    const kingSideRook = getPieceAt(
      board,
      king.currentSquare.row,
      rookPositions.kingSideRookCol,
    );
    const queenSideRook = getPieceAt(
      board,
      king.currentSquare.row,
      rookPositions.queenSideRookCol,
    );
    const kingRookAndKingMoved =
      kingSideRook && havePiecesMoved([king, kingSideRook]);
    const queenRookAndKingMoved =
      queenSideRook && havePiecesMoved([king, queenSideRook]);

    if (kingSideRook && !kingRookAndKingMoved) {
      legalMoves.push(
        createCastlingMove(
          king,
          kingSideRook,
          king.currentSquare,
          createSquare(
            king.currentSquare.row,
            king.currentSquare.col + 2,
            king,
          ),
          kingSideRook.currentSquare,
          createSquare(
            kingSideRook.currentSquare.row,
            kingSideRook.currentSquare.col - 2,
            kingSideRook,
          ),
        ),
      );
    }

    if (queenSideRook && !queenRookAndKingMoved) {
      legalMoves.push(
        createCastlingMove(
          king,
          queenSideRook,
          king.currentSquare,
          createSquare(
            king.currentSquare.row,
            king.currentSquare.col - 2,
            king,
          ),
          queenSideRook.currentSquare,
          createSquare(
            queenSideRook.currentSquare.row,
            queenSideRook.currentSquare.col + 3,
            queenSideRook,
          ),
        ),
      );
    }
  };

  directions.forEach(([dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetSquare = createSquare(newRow, newCol, piece);
      const targetPiece = getPieceAt(board, newRow, newCol);
      const capturedPiece =
        targetPiece && targetPiece.color !== piece.color
          ? targetPiece
          : undefined;
      if (capturedPiece) {
        legalMoves.push(
          createStandardMove(
            piece,
            piece.currentSquare,
            targetSquare,
            capturedPiece,
          ),
        );
      } else if (!targetPiece) {
        legalMoves.push(
          createStandardMove(piece, piece.currentSquare, targetSquare),
        );
      }
    }
  });
  addCastlingMoves(board, piece, legalMoves);

  return legalMoves;
};
