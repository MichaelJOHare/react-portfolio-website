import { getPieceUnicode, squareToString } from "../../../utils";
import { MoveType, PieceType, PlayerColor } from "../../../types";
import { useGame } from "../../../context/GameContext";

export const MoveList = () => {
  const { gameManager, highlighter } = useGame();
  const { replayMoves, moveHistory } = gameManager;
  const { undoPreviousMoveSquares } = highlighter;
  const movesHistory = moveHistory.map((record) => record.move);

  const onMoveClick = (index: number) => {
    const movesToUndo = movesHistory.length - index - 1;
    if (movesToUndo > 0) {
      replayMoves(movesToUndo, true);
    }
    undoPreviousMoveSquares(movesToUndo);
  };

  return (
    // add disambiguate capture, promotion, etc.
    <ul className="flex flex-wrap items-center">
      {movesHistory.map((move, index) => {
        const { from, to } = move;
        const isEvenIndex = index % 2 === 0;
        return (
          <li
            className={`inline-block cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-600 ${
              isEvenIndex ? "ml-3 mr-1" : ""
            } ${
              index === movesHistory.length - 1
                ? "border-2 border-spacing-0 border-blue-600 bg-zinc-400"
                : ""
            }`}
            key={index}
            onClick={() => onMoveClick(index)}
          >
            <span className="flex items-center">
              {isEvenIndex && (
                <span className="font-bold text-lg">{(index + 2) / 2}. </span>
              )}
              {move.type === MoveType.CASTLE &&
                (from.col - to.col > 0 ? "O-O-O" : "O-O")}
              {move.type === MoveType.STNDRD && (
                <>
                  <span
                    className={`relative text-3xl ${
                      move.piece.color === PlayerColor.BLACK
                        ? "text-zinc-600"
                        : ""
                    }`}
                  >
                    {move.piece.type !== PieceType.PAWN &&
                      getPieceUnicode(move.piece.type)}
                  </span>
                  {squareToString(to)}
                </>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
