import { useDraggable } from "@dnd-kit/core";
import { PieceType, PlayerColor, Square } from "../../types";

type ChessPieceProps = {
  type: PieceType;
  color: PlayerColor;
  square: Square;
};

export const ChessPiece = ({ type, color, square }: ChessPieceProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${square.row}-${square.col}`,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, // detect mobile, scale up if so... maybe use globals.css
      }
    : undefined;

  return (
    <>
      {isDragging && (
        <img
          className="pointer-events-none z-0 h-5/6 opacity-50 select-none"
          src={`/assets/images/${color}-${type}.svg`}
          alt={`${type}-ghost`}
        />
      )}
      <img
        className={`absolute z-10 h-5/6 select-none ${
          isDragging ? "z-20 cursor-grabbing" : "cursor-pointer"
        }`}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        src={`/assets/images/${color}-${type}.svg`}
        alt={`${type}`}
      />
    </>
  );
};
