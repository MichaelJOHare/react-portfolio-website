import { MovementStrategy, Move } from "../../types";
import { createStandardMove, createSquare, getPieceAt } from "../index";

export const queenMovementStrategy: MovementStrategy = (board, piece) => {
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

  directions.forEach(([dRow, dCol]) => {
    let newRow = row + dRow;
    let newCol = col + dCol;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetSquare = createSquare(newRow, newCol, piece);
      const targetPiece = getPieceAt(board, newRow, newCol);
      const capturedPiece =
        targetPiece && targetPiece.color !== piece.color
          ? targetPiece
          : undefined;
      if (targetPiece && targetPiece.color === piece.color) {
        break;
      }
      legalMoves.push(
        createStandardMove(
          piece,
          piece.currentSquare,
          targetSquare,
          capturedPiece,
        ),
      );
      if (capturedPiece) {
        break;
      }

      newRow += dRow;
      newCol += dCol;
    }
  });

  return legalMoves;
};
