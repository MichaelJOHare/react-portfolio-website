import { Piece, Square } from "../types";

const legendLetter: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
const legendNumber: string[] = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const createSquare = (
  row: number,
  col: number,
  piece?: Piece,
): Square => ({
  row,
  col,
  piece,
});

export const flipSquare = (square: Square): Square => ({
  row: 7 - square.row,
  col: 7 - square.col,
});

export const squareToString = (square: Square): string => {
  return legendLetter[square.col] + legendNumber[square.row];
};

export const getFileFromCol = (col: number) => legendLetter[col];

export const getSquareFromNotation = (notationSquare: string): Square => {
  const col: number = legendLetter.indexOf(notationSquare.substring(0, 1));
  const row: number = legendNumber.indexOf(notationSquare.substring(1, 2));
  return { row, col };
};
