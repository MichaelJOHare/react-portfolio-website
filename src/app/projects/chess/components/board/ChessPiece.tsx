import { Piece, PieceType, PlayerColor } from "../../types";

type ChessPieceProps = {
  piece: Piece;
  type: PieceType;
  color: PlayerColor;
  square: number[];
};

export const ChessPiece = ({ piece, type, color, square }: ChessPieceProps) => {
  return (
    <img
      className="h-3/4 z-10"
      src={`/assets/images/${color}-${type}.svg`}
      alt={`${type}`}
    />
  );
};
