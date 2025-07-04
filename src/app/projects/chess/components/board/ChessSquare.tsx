import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Square } from "../../types";

type SquareProps = {
  square: Square;
  isBoardFlipped: boolean;
  isValidMove: boolean;
  isKingInCheck: boolean;
  kingSquare: Square | undefined;
  onSquareClick: (row: number, col: number) => void;
  previousMoveSquares?: Square[];
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
  previousMoveSquares,
  dragStartSquare,
  children,
}: SquareProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `${square.row}-${square.col}`,
  });
  const isDark = (square.row + square.col) % 2 === 0;
  const isOccupied = !!children;
  const isLabeledColumn = square.col === 7;
  const isLabeledRow = square.row === 7;
  const columnLabel = isBoardFlipped ? 1 + square.row : 8 - square.row;
  const rowLabel = isBoardFlipped
    ? String.fromCharCode(104 - square.col)
    : String.fromCharCode(97 + square.col);

  const getColor = () => {
    const isSameSquare = (a?: Square, b?: Square) =>
      a?.row === b?.row && a?.col === b?.col;

    const isPreviousMoveSquare =
      previousMoveSquares?.some((sq) => isSameSquare(sq, square)) ?? false;

    const isDropTarget =
      isOver && dragStartSquare && !isSameSquare(square, dragStartSquare);

    const isSelected = isSameSquare(selectedPieceSquare, square);
    const isKingHere = isSameSquare(kingSquare, square);

    if (isPreviousMoveSquare) {
      return isDark ? "bg-previousMoveLight" : "bg-previousMoveDark";
    }

    if (isDropTarget) {
      return isValidMove
        ? "bg-green-500"
        : isDark
        ? "bg-lightSquare"
        : "bg-darkSquare";
    }

    if (isKingInCheck && isKingHere) {
      return "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-current to-red-500";
    }

    if (isSelected) {
      return "bg-green-300";
    }

    return isDark ? "bg-lightSquare" : "bg-darkSquare";
  };

  return (
    <div
      className={`relative flex justify-center items-center w-full h-full aspect-square ${getColor()}`}
      ref={setNodeRef}
      onClick={() => onSquareClick(square.row, square.col)}
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
