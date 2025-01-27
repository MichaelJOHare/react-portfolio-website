import { Piece, Square } from "../types";

const legendLetter: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
const legendNumber: string[] = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const createSquare = (
  row: number,
  col: number,
  piece?: Piece
): Square => ({
  row,
  col,
  piece,
});

export const squareToString = (square: Square): string => {
  return legendLetter[square.col] + legendNumber[square.row];
};
