import { useGame } from "../../context/GameContext";
import { PieceType, PlayerColor } from "../../types";
import { getPieceUnicode } from "../../utils";

type CapturedPiecesProps = {
  color: PlayerColor.WHITE | PlayerColor.BLACK;
};

const material = {
  [PieceType.QUEEN]: 9,
  [PieceType.ROOK]: 5,
  [PieceType.KNIGHT]: 3,
  [PieceType.BISHOP]: 3,
  [PieceType.PAWN]: 1,
  [PieceType.KING]: 0,
};

export const CapturedPieces = ({ color }: CapturedPiecesProps) => {
  const { gameManager } = useGame();
  const { capturedPieces } = gameManager;
  const opponentCaptured = capturedPieces.filter((p) => p.color !== color);
  const ownCaptured = capturedPieces.filter((p) => p.color === color);
  const gainedPoints = ownCaptured.reduce(
    (sum, p) => sum + (material[p.type] || 0),
    0,
  );
  const lostPoints = opponentCaptured.reduce(
    (sum, p) => sum + (material[p.type] || 0),
    0,
  );
  const materialAdvantage = gainedPoints - lostPoints;

  return (
    <div className="h-7 w-full">
      {ownCaptured.map((piece, index) => (
        <span
          className="font-mono text-lg text-neutral-600 dark:text-neutral-200"
          key={index}
        >
          {getPieceUnicode(piece.type)}
        </span>
      ))}
      <span className="ml-2 text-sm font-semibold">
        {materialAdvantage > 0 ? `+${materialAdvantage}` : ""}
      </span>
    </div>
  );
};
