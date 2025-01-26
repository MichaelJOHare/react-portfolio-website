import { useDraggable } from "@dnd-kit/core";
import { Piece, PieceType, PlayerColor } from "../../types";

type ChessPieceProps = {
  type: PieceType;
  color: PlayerColor;
  square: number[];
};

export const ChessPiece = ({ type, color, square }: ChessPieceProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${square[0]}${square[1]}`,
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
