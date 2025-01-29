import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { useChessGame } from "../../hooks/useChessGame";
import { useState } from "react";
import { Piece, PlayerColor, PlayerType } from "../../types";
import { Arrow } from "../ui/Arrow";
import { Circle } from "../ui/Circle";
import { useHighlighter } from "../../hooks/useHighlighter";
import { PromotionPanel } from "../ui/PromotionPanel";

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
  const { board, getLegalMoves, executeMove } = gameManager;
  const playerMoves = getLegalMoves();
  const currentPlayer = gameManager.players[gameManager.currentPlayerIndex];
  const [selectedPiece, setSelectedPiece] = useState<
    | {
        row: number;
        col: number;
      }
    | undefined
  >(undefined);
  const [dragStartSquare, setDragStartSquare] = useState<
    | {
        row: number;
        col: number;
      }
    | undefined
  >(undefined);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );

  const selectPiece = (row: number, col: number, piece: Piece) => {
    setSelectedPiece({ row, col });
    setValidMoves(
      playerMoves
        .filter((move) => move.piece === piece)
        .map((move) => ({ row: move.to.row, col: move.to.col }))
    );
  };

  const deselectPiece = () => {
    setSelectedPiece(undefined);
    setValidMoves([]);
  };

  const handleClickToMove = (row: number, col: number) => {
    const piece = board[row][col].piece;
    const isCurrentPlayerPiece =
      piece &&
      piece.player.type !== PlayerType.COMPUTER &&
      piece.player === currentPlayer;

    if (selectedPiece) {
      if (validMoves.some((move) => move.row === row && move.col === col)) {
        const { row: startRow, col: startCol } = selectedPiece;
        executeMove(startRow, startCol, row, col, playerMoves);
        deselectPiece();
      } else if (isCurrentPlayerPiece) {
        selectPiece(row, col, piece);
      } else {
        deselectPiece();
      }
    } else if (isCurrentPlayerPiece) {
      selectPiece(row, col, piece);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const [startRow, startCol] = String(event.active.id).split("").map(Number);
    setDragStartSquare({ row: startRow, col: startCol });
    const piece = board[startRow][startCol].piece;
    if (
      !piece ||
      piece.player.type === PlayerType.COMPUTER ||
      piece.player !== currentPlayer
    )
      return;

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

    if (startRow === endRow && startCol === endCol) {
      // if the piece is dropped on its original square, treat it as a click
      handleClickToMove(startRow, startCol);
    } else {
      executeMove(startRow, startCol, endRow, endCol, playerMoves);
    }
  };

  const handlePromotionSelect = () => {};

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
        {/*
        <div className="absolute top-0 left-0 w-[90vmin] h-[90vmin] bg-black bg-opacity-20 z-20 lg:w-[70vmin] lg:h-[70vmin]">
          <PromotionPanel
            isBoardFlipped={isBoardFlipped}
            square={}
            promotingPawn={}
            color={}
            onPromotionSelect={handlePromotionSelect}
          />
        </div>
         */}
        {/* arrows and circles drawn while holding down right click */}
        {<Arrow {...highlighter.tempDrawings.arrowCoordinates} />}
        {<Circle {...highlighter.tempDrawings.circleCoordinates} />}
        {/* arrows and circles that stay after drawing completes, keys used for removing arrows/circles by drawing back over them */}
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
              onSquareClick={handleClickToMove}
              selectedPiece={selectedPiece}
              dragStartSquare={dragStartSquare}
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
