import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { useChessGame } from "../../hooks/useChessGame";
import { useState } from "react";
import { PlayerType } from "../../types";
import { Arrow } from "../ui/Arrow";
import { Circle } from "../ui/Circle";
import { useHighlighter } from "../../hooks/useHighlighter";

type BoardProps = {
  gameManager: ReturnType<typeof useChessGame>;
  highlighter: ReturnType<typeof useHighlighter>;
  isBoardFlipped: boolean;
};

export const Board = ({
  gameManager,
  isBoardFlipped,
  highlighter,
}: BoardProps) => {
  const { board } = gameManager;
  const playerMoves = gameManager.getLegalMoves(); // will need to be getLegalMoves() in the future to account for check
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );

  /*   implement piece selection and move with click -> onClick set selected piece -> setValidMoves ->
  pass selectedPiece.currentSquare to ChessSquare  -> onClick when piece is selected && is validMove square -> move piece  */

  const handleDragStart = (event: DragStartEvent) => {
    const [startRow, startCol] = String(event.active.id).split("").map(Number);
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
        onMouseDown={highlighter.onMouseDown}
        onMouseMove={highlighter.onMouseMove}
        onMouseUp={highlighter.onMouseUp}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        {/* arrows and circles drawn while holding down right click */}
        {<Arrow {...highlighter.tempDrawings.arrowCoordinates} />}
        {<Circle {...highlighter.tempDrawings.circleCoordinates} />}
        {/* permanent arrows and circles, keys used for removing arrows/circles by drawing back over them */}
        {highlighter.highlightedSquares.arrowsDrawnOnSquares.map(
          (arrow, index) => (
            <Arrow key={`arrow-${index}`} {...arrow} />
          )
        )}
        {highlighter.highlightedSquares.circlesDrawnOnSquares.map(
          (circle, index) => (
            <Circle key={`circle-${index}`} {...circle} />
          )
        )}
        {highlighter.highlightedSquares.stockfishBestMoveArrow.map(
          (arrow, index) => (
            <Arrow key={`stockfish-arrow-${index}`} {...arrow} />
          )
        )}
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
