import { useDroppable } from "@dnd-kit/core";
import React from "react";

type SquareProps = {
  square: number[];
  isBoardFlipped: boolean;
  children: React.ReactNode;
  onSquareClick: (row: number, col: number) => void;
};

export const ChessSquare = ({
  square,
  isBoardFlipped,
  children,
}: SquareProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${square[0]}-${square[1]}`,
  });
  const isDark = (square[0] + square[1]) % 2 === 0;
  const isLabeledColumn = square[1] === 7;
  const isLabeledRow = square[0] === 7;
  const columnLabel = isBoardFlipped ? 1 + square[0] : 8 - square[0];
  const rowLabel = isBoardFlipped
    ? String.fromCharCode(104 - square[1])
    : String.fromCharCode(97 + square[1]);

  const getColor = (isDark: boolean) => {
    return isOver ? "bg-green-500" : isDark ? "bg-orange-200" : "bg-yellow-900";
  };

  return (
    <div
      className={`relative flex justify-center items-center w-full h-full aspect-square ${getColor(
        isDark
      )}`}
      ref={setNodeRef}
    >
      {children}
      {isLabeledColumn && (
        <div
          className={`absolute top-0 right-0 pt-1 pr-1 text-xs lg:text-sm ${
            isDark ? "text-yellow-900" : "text-orange-200"
          } select-none`}
        >
          {columnLabel}
        </div>
      )}
      {isLabeledRow && (
        <div
          className={`absolute bottom-0 left-0 pl-1 text-xs lg:text-sm ${
            isDark ? "text-yellow-900" : "text-orange-200"
          } select-none`}
        >
          {rowLabel}
        </div>
      )}
    </div>
  );
};
