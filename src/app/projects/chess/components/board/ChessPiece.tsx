import { useDraggable } from "@dnd-kit/core";
import { PieceType, PlayerColor, Square } from "../../types";
import { useGame } from "../../context/GameContext";

type ChessPieceProps = {
  type: PieceType;
  color: PlayerColor;
  square: Square;
};

export const ChessPiece = ({ type, color, square }: ChessPieceProps) => {
  const { isBoardFlipped } = useGame();
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  const scale = isMobile ? 1.75 : 1;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${square.row}-${square.col}`,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${scale})`,
        transformOrigin: "center center",
      }
    : undefined;

  return (
    <>
      {isDragging && (
        <img
          className={`pointer-events-none z-0 h-full opacity-50 select-none ${isBoardFlipped ? "rotate-180" : ""}`}
          src={`/assets/images/${color}-${type}.svg`}
          alt={`${type}-ghost`}
        />
      )}
      <img
        className={`absolute z-10 h-full select-none ${isBoardFlipped ? "rotate-180" : ""} ${
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
