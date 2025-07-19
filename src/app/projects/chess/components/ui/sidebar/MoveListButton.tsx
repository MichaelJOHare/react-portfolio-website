import { Move, MoveHistory, PieceType } from "../../../types";
import { getMoveDisplay, getPieceUnicode, getSquare } from "../../../utils";

export const MoveListButton = ({
  move,
  record,
  isActive,
  onClick,
  isWhite,
}: {
  move: Move;
  record: MoveHistory;
  isActive: boolean;
  onClick: () => void;
  isWhite: boolean;
}) => {
  const from = getSquare(move.from, record.wasBoardFlipped);
  const to = getSquare(move.to, record.wasBoardFlipped);
  const display = getMoveDisplay(
    move,
    from,
    to,
    record.causedCheck,
    record.causedCheckMate,
  );

  return (
    <button
      type="button"
      className={`flex h-full items-center gap-1 rounded px-2 py-1 hover:bg-zinc-300 dark:hover:bg-slate-400 ${
        isActive
          ? `border border-stone-700 bg-zinc-200 dark:border-stone-200 dark:bg-slate-600`
          : ""
      } ${isWhite ? "mr-1" : "ml-1 pl-2"}`}
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
