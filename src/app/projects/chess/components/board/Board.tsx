import { Square } from "../../types";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";

type BoardProps = {
  board: Square[][];
  isBoardFlipped: boolean;
};

export const Board = ({ board, isBoardFlipped }: BoardProps) => {
  return (
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
  );
};
