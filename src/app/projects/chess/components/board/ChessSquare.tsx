import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Square } from "../../types";
import { useGame } from "../../context/GameContext";

type SquareProps = {
  square: Square;
  isValidMove: boolean;
  children: React.ReactNode;
};

export const ChessSquare = ({ square, isValidMove, children }: SquareProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `${square.row}-${square.col}`,
  });
  const { gameManager, highlighter, pieceSelector, isBoardFlipped } = useGame();
  const { isKingInCheck, kingSquare } = gameManager;
  const { highlightedSquares } = highlighter;
  const { handleClick, selectedPieceSquare, dragStartSquare } = pieceSelector;
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
      highlightedSquares.previousMoveSquares
        ?.slice(-2)
        .some((sq) => isSameSquare(sq, square)) ?? false;

    const isDropTarget =
      isOver && dragStartSquare && !isSameSquare(square, dragStartSquare);

    const isSelected = isSameSquare(selectedPieceSquare, square);
    const isKingHere = isSameSquare(kingSquare, square);

    if (isPreviousMoveSquare && !(isOver && isValidMove)) {
      return isDark ? "bg-previousMoveLight" : "bg-previousMoveDark";
    }

    if (isDropTarget && !(isKingInCheck && isKingHere)) {
      return isValidMove
        ? "bg-green-500"
        : isDark
          ? "bg-lightSquare"
          : "bg-darkSquare";
    }

    if (isKingInCheck && isKingHere) {
      return "bg-radial from-red-300 to-red-500";
    }

    if (isSelected) {
      return "bg-green-300";
    }

    return isDark ? "bg-lightSquare" : "bg-darkSquare";
  };

  return (
    <div
      className={`relative flex aspect-square h-full w-full items-center
        justify-center ${getColor()}`}
      ref={setNodeRef}
      onClick={() => handleClick(square.row, square.col)}
    >
      {/* adds green circles and corners for legal moves when piece is dragged */}
      {isValidMove && !isOccupied && !isOver && (
        <div className="absolute h-1/3 w-1/3 rounded-full bg-green-600"></div>
      )}
      {isValidMove && isOccupied && !isOver && (
        <div
          className="absolute flex h-full w-full items-center justify-center
            overflow-hidden bg-green-600"
        >
          <div
            className={`relative h-full w-full rounded-full ${getColor()}
            scale-115 transform`}
          ></div>
        </div>
      )}

      {children}

      {isLabeledColumn && (
        <div
          className={`desktop-md:text-sm absolute top-0 right-0 pt-1 pr-1
          text-xs ${isDark ? "text-yellow-900" : "text-orange-200"} select-none`}
        >
          {columnLabel}
        </div>
      )}
      {isLabeledRow && (
        <div
          className={`desktop-md:text-sm absolute bottom-0 left-0 pl-1 text-xs
          ${isDark ? "text-yellow-900" : "text-orange-200"} select-none`}
        >
          {rowLabel}
        </div>
      )}
    </div>
  );
};
