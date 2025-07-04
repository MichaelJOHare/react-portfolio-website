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
          className="h-5/6 z-0 select-none opacity-50 pointer-events-none"
          src={`/assets/images/${color}-${type}.svg`}
          alt={`${type}-ghost`} // create a ghost image when dragging
        />
      )}
      <img
        className={`h-5/6 z-10 select-none absolute ${
          isDragging ? "cursor-grabbing" : "cursor-pointer"
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
