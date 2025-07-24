import { Move, MoveHistory, PieceType } from "../../../types";
import {
  getFileFromCol,
  getPieceUnicode,
  squareToString,
} from "../../../utils";

export const MoveListButton = ({
  move,
  record,
  isActive,
  isUndone = false,
  isWhite,
  onClick,
}: {
  move: Move;
  record: MoveHistory;
  isActive: boolean;
  isUndone?: boolean;
  isWhite: boolean;
  onClick: () => void;
}) => {
  const isPawn = move.piece.type === PieceType.PAWN;
  const captured = move.capturedPiece;

  let display = "";

  if (isPawn && captured) {
    display += `${getFileFromCol(move.from.col)}×${squareToString(move.to)}`;
  } else {
    if (captured) display += "x";
    display += squareToString(move.to);
  }

  if (record.causedCheck) display += "+";
  if (record.causedCheckMate) display += "#";

  return (
    <button
      type="button"
      className={`flex h-full items-center gap-1 rounded px-2 py-1 hover:bg-zinc-300 dark:hover:bg-slate-400 ${
        isActive
          ? `border border-stone-700 bg-zinc-200 dark:border-stone-200 dark:bg-slate-600`
          : ""
      } ${isUndone ? "opacity-50" : ""} ${isWhite ? "mr-1" : "ml-1 pl-2"}`}
      onClick={onClick}
    >
      {move.piece.type !== PieceType.PAWN && (
        <span
          className={`mb-2 text-3xl ${
            isWhite
              ? "drop-shadow-wPiece text-neutral-100"
              : "drop-shadow-bPiece dark:text-neutral-900"
          }`}
        >
          {getPieceUnicode(move.piece.type)}
        </span>
      )}
      <span className="text-center text-2xl text-gray-800 dark:text-gray-200">
        {display}
      </span>
    </button>
  );
};
