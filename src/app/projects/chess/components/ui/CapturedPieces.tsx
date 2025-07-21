import { useGame } from "../../context/GameContext";
import { Piece, PieceType, PlayerColor } from "../../types";
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
  const { capturedPieces, piecesByPlayer } = gameManager;

  const opponentColor =
    color === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE;
  const ownAlivePieces =
    piecesByPlayer.get(color)?.filter((p) => p.isAlive) ?? [];
  const oppAlivePieces =
    piecesByPlayer.get(opponentColor)?.filter((p) => p.isAlive) ?? [];

  const aliveOwnMaterial = ownAlivePieces.reduce(
    (sum, p) => sum + (material[p.type] || 0),
    0,
  );
  const aliveOpponentMaterial = oppAlivePieces.reduce(
    (sum, p) => sum + (material[p.type] || 0),
    0,
  );

  const materialAdvantage = aliveOpponentMaterial - aliveOwnMaterial;

  const isOpponent = (p: Piece) => p.color !== color;
  const isOwn = (p: Piece) => p.color === color;
  const capturedType = (p: Piece) => (p.wasPromoted ? PieceType.PAWN : p.type);

  const buildPieceCount = (pieces: Piece[]) => {
    const count = new Map<PieceType, number>();
    for (const p of pieces) {
      const type = capturedType(p);
      count.set(type, (count.get(type) || 0) + 1);
    }
    return count;
  };

  const ownCount = buildPieceCount(capturedPieces.filter(isOwn));
  const opponentCount = buildPieceCount(capturedPieces.filter(isOpponent));

  // cancel out matched pieces
  for (const [type, ownQty] of ownCount.entries()) {
    const oppQty = opponentCount.get(type) || 0;
    const minQty = Math.min(ownQty, oppQty);
    if (minQty > 0) {
      ownCount.set(type, ownQty - minQty);
      opponentCount.set(type, oppQty - minQty);
    }
  }

  const renderCaptured = (countMap: Map<PieceType, number>) =>
    Array.from(countMap.entries()).flatMap(([type, count]) =>
      Array.from({ length: count }).map((_, i) => (
        <span
          key={`${type}-${i}`}
          className="font-mono text-lg text-neutral-600 dark:text-neutral-200"
        >
          {getPieceUnicode(type)}
        </span>
      )),
    );

  return (
    <div className="h-7 w-full">
      {renderCaptured(ownCount)}
      <span className="ml-2 text-sm font-semibold">
        {materialAdvantage > 0 ? `+${materialAdvantage}` : ""}
      </span>
    </div>
  );
};
