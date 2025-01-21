import { useDraggable } from "@dnd-kit/core";
import { Piece, PieceType, PlayerColor } from "../../types";

type ChessPieceProps = {
  piece: Piece;
  type: PieceType;
  color: PlayerColor;
  square: number[];
};

export const ChessPiece = ({ piece, type, color, square }: ChessPieceProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${type}-${square[0]}-${square[1]}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <img
      className="h-3/4 z-10 select-none"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      src={`/assets/images/${color}-${type}.svg`}
      alt={`${type}`}
    />
  );
};
