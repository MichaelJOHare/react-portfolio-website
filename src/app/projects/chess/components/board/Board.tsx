import { DndContext } from "@dnd-kit/core";
import { Square } from "../../types";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { useState } from "react";

type BoardProps = {
  board: Square[][];
  isBoardFlipped: boolean;
};

export const Board = ({ board, isBoardFlipped }: BoardProps) => {
  const [parent, setParent] = useState(null);

  const handlePieceSelection = (row: number, col: number) => {};

  return (
    <DndContext>
      <div
        id="chessboard"
        className="relative grid grid-cols-8 w-[90vmin] h-[90vmin] lg:w-[70vmin] lg:h-[70vmin]"
      >
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <ChessSquare
              key={`${rowIndex}-${colIndex}`}
              square={[rowIndex, colIndex]}
              isBoardFlipped={isBoardFlipped}
              onSquareClick={handlePieceSelection}
            >
              {square.piece && square.piece.isAlive && (
                <ChessPiece
                  type={square.piece.type}
                  color={square.piece.color}
                  piece={square.piece}
                  square={[rowIndex, colIndex]}
                />
              )}
            </ChessSquare>
          ))
        )}
      </div>
    </DndContext>
  );
};
