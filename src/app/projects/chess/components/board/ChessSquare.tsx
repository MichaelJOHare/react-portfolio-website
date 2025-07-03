import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Square } from "../../types";

type SquareProps = {
  square: number[];
  isBoardFlipped: boolean;
  isValidMove: boolean;
  isKingInCheck: boolean;
  kingSquare: Square | undefined;
  onSquareClick: (row: number, col: number) => void;
  selectedPieceSquare?: Square;
  dragStartSquare?: Square;
  children: React.ReactNode;
};

export const ChessSquare = ({
  square,
  isBoardFlipped,
  isValidMove,
  isKingInCheck,
  kingSquare,
  onSquareClick,
  selectedPieceSquare,
  dragStartSquare,
  children,
}: SquareProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `${square[0]}${square[1]}`,
  });
  const isDark = (square[0] + square[1]) % 2 === 0;
  const isOccupied = !!children;
  const isLabeledColumn = square[1] === 7;
  const isLabeledRow = square[0] === 7;
  const columnLabel = isBoardFlipped ? 1 + square[0] : 8 - square[0];
  const rowLabel = isBoardFlipped
    ? String.fromCharCode(104 - square[1])
    : String.fromCharCode(97 + square[1]);

  const getColor = () => {
    // implement previous move highlight
    if (
      isOver &&
      dragStartSquare &&
      (square[0] !== dragStartSquare.row || square[1] !== dragStartSquare.col)
    ) {
      return isValidMove ? "bg-green-500" : "bg-red-500";
    }
    if (
      isKingInCheck &&
      kingSquare?.row === square[0] &&
      kingSquare?.col === square[1]
    ) {
      return "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-current to-red-500";
    }
    if (
      selectedPieceSquare?.row === square[0] &&
      selectedPieceSquare?.col === square[1]
    ) {
      return "bg-green-300";
    }
    return isDark ? "bg-orange-200" : "bg-yellow-900";
  };

  return (
    <div
      className={`relative flex justify-center items-center w-full h-full aspect-square ${getColor()}`}
      ref={setNodeRef}
      onClick={() => onSquareClick(square[0], square[1])}
    >
      {/* adds green circles and corners for legal moves when piece is dragged */}
      {isValidMove && !isOccupied && (
        <div className="absolute w-4 h-4 rounded-full bg-green-600"></div>
      )}
      {isValidMove && isOccupied && (
        <div className="absolute w-full h-full flex justify-center items-center bg-green-600 overflow-hidden">
          <div
            className={`relative w-full h-full rounded-full ${getColor()} transform scale-110`}
          ></div>
        </div>
      )}

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
