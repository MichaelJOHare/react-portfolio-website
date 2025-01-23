import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { useChessGame } from "../../hooks/useChessGame";
import { useState } from "react";
import { createSquare } from "../../utils";

type BoardProps = {
  gameManager: ReturnType<typeof useChessGame>;
  isBoardFlipped: boolean;
};

export const Board = ({ gameManager, isBoardFlipped }: BoardProps) => {
  const { board } = gameManager;
  const playerMoves = gameManager.getPlayerMoves();
  console.log(playerMoves);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );

  const handleDragStart = (event: DragStartEvent) => {
    const startId = String(event.active.id);
    const [startRow, startCol] = startId.split("").map(Number);
    const piece = board[startRow][startCol].piece;
    if (!piece) return;

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

    // move this all into an execute move function, add update move history/undone moves/half move clock/full move number
    const piece = board[startRow][startCol]?.piece;
    if (!piece) return;

    const isValidMove = playerMoves.some(
      ({ piece: movePiece, from, to }) =>
        movePiece.id === piece.id &&
        from.row === startRow &&
        from.col === startCol &&
        to.row === endRow &&
        to.col === endCol
    );

    if (!isValidMove) return;

    const newBoard = board.map((row) => row.map((square) => ({ ...square })));

    const capturedPiece = newBoard[endRow][endCol]?.piece;
    newBoard[endRow][endCol].piece = piece;
    newBoard[startRow][startCol].piece = undefined;

    piece.currentSquare = createSquare(endRow, endCol);

    gameManager.updatePlayerPieces(
      capturedPiece ? [piece, capturedPiece] : [piece]
    );
    gameManager.setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentPlayerIndex: prevState.currentPlayerIndex === 0 ? 1 : 0,
    }));
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
