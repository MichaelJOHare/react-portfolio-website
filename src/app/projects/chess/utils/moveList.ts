import { Move, PieceType, Square } from "../types";
import { getFileFromCol, squareToString } from "./square";

export const getMoveDisplay = (
  move: Move,
  from: Square,
  to: Square,
  causedCheck?: boolean,
  causedCheckMate?: boolean,
) => {
  const isPawn = move.piece.type === PieceType.PAWN;
  const captured = move.capturedPiece;

  let display = "";

  if (isPawn && captured) {
    display += `${getFileFromCol(from.col)}×${squareToString(to)}`;
  } else {
    if (captured) display += "x";
    display += squareToString(to);
  }

  if (causedCheck) display += "+";
  if (causedCheckMate) display += "#";

  return display;
};
