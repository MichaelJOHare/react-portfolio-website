import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { useChessGame } from "../../hooks/useChessGame";
import { useState } from "react";
import { PlayerType } from "../../types";

type BoardProps = {
  gameManager: ReturnType<typeof useChessGame>;
  isBoardFlipped: boolean;
};

export const Board = ({ gameManager, isBoardFlipped }: BoardProps) => {
  const { board } = gameManager;
  const playerMoves = gameManager.getPlayerMoves(); // will need to be getLegalMoves() in the future to account for check
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );

  /*   implement piece selection and move with click -> onClick set selected piece -> setValidMoves ->
  pass selectedPiece.currentSquare to ChessSquare  -> onClick when piece is selected && is validMove square -> move piece  */

  const handleDragStart = (event: DragStartEvent) => {
    const startId = String(event.active.id);
    const [startRow, startCol] = startId.split("").map(Number);
    const piece = board[startRow][startCol].piece;
    if (!piece || piece.player.type === PlayerType.COMPUTER) return;

    // used to store valid moves for a piece being dragged so squares can be highlighted if they're legal or not
    setValidMoves(
      playerMoves
        .filter((move) => move.piece === piece)
        .map((move) => ({ row: move.to.row, col: move.to.col }))
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setValidMoves([]);

    const { active, over } = event;
    if (!over) return; // early return if drop target is not a square

    const [startRow, startCol] = String(active.id).split("").map(Number);
    const [endRow, endCol] = String(over.id).split("").map(Number);

    gameManager.executeMove(startRow, startCol, endRow, endCol, playerMoves);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
              isValidMove={validMoves.some(
                (move) => move.row === rowIndex && move.col === colIndex
              )}
              isKingInCheck={gameManager.isKingInCheck}
              kingSquare={gameManager.kingSquare}
            >
              {square.piece && square.piece.isAlive && (
                <ChessPiece
                  type={square.piece.type}
                  color={square.piece.color}
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
