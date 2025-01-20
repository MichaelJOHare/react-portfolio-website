import { Piece, Square } from "../types";

export const createSquare = (
  row: number,
  col: number,
  piece?: Piece
): Square => ({
  row,
  col,
  piece,
});
