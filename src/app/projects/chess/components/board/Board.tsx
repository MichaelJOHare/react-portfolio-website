import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { useChessGame } from "../../hooks/useChessGame";
import { useState } from "react";
import { Piece, PlayerColor, PlayerType, Square } from "../../types";
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
  const [selectedPieceSquare, setSelectedPieceSquare] = useState<
    Square | undefined
  >(undefined);
  const [dragStartSquare, setDragStartSquare] = useState<Square | undefined>(
    undefined
  );
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>(
    []
  );

  // separate piece selection, valid moves, drag/click moves, etc. into usePieceSelection hook
  const isMoveValid = (row: number, col: number) =>
    validMoves.some((move) => move.row === row && move.col === col);

  const parseSquareId = (id: string): Square => {
    const [row, col] = id.split("-").map(Number);
    return { row, col };
  };

  const isCurrentPlayerPiece = (piece: Piece | undefined) => {
    return (
      piece &&
      piece.player.type !== PlayerType.COMPUTER &&
      piece.player === currentPlayer
    );
  };

  const selectPiece = (row: number, col: number, piece: Piece | undefined) => {
    setSelectedPieceSquare({ row, col });
    piece &&
      setValidMoves(
        playerMoves
          .filter((move) => move.piece === piece)
          .map((move) => ({ row: move.to.row, col: move.to.col }))
      );
  };

  const deselectPiece = () => {
    setSelectedPieceSquare(undefined);
    setValidMoves([]);
  };

  const handleClickToMove = (row: number, col: number) => {
    const piece = board[row][col].piece;

    if (selectedPieceSquare) {
      if (isMoveValid(row, col)) {
        finalizeMove(selectedPieceSquare, { row, col });
      } else if (isCurrentPlayerPiece(piece)) {
        selectPiece(row, col, piece);
      } else {
        deselectPiece();
      }
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const startSquare = parseSquareId(event.active.id as string);
    const startRow = startSquare.row;
    const startCol = startSquare.col;
    const piece = board[startRow][startCol].piece;
    if (!isCurrentPlayerPiece(piece)) {
      return;
    }
    deselectPiece();
    selectPiece(startRow, startCol, piece);
    setDragStartSquare({ row: startRow, col: startCol });

    // used to store valid moves for a piece being dragged so squares can be highlighted if they're legal or not
    setValidMoves(
      playerMoves
        .filter((move) => move.piece === piece)
        .map((move) => ({ row: move.to.row, col: move.to.col }))
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    deselectPiece();
    setValidMoves([]);

    const { active, over } = event;
    if (!over) return; // early return if drop target is not a square

    const startSquare = parseSquareId(active.id as string);
    const endSquare = parseSquareId(over.id as string);

    if (
      startSquare.row === endSquare.row &&
      startSquare.col === endSquare.col
    ) {
      // if the piece is dropped on its original square, treat it as a click
      handleClickToMove(startSquare.row, startSquare.col);
    } else {
      isMoveValid(endSquare.row, endSquare.col) &&
        finalizeMove(
          { row: startSquare.row, col: startSquare.col },
          { row: endSquare.row, col: endSquare.col }
        );
    }
  };

  const handlePromotionSelect = () => {};

  const finalizeMove = (startSquare: Square, endSquare: Square) => {
    executeMove(
      startSquare.row,
      startSquare.col,
      endSquare.row,
      endSquare.col,
      playerMoves
    );
    highlighter.addPreviousMoveSquares(startSquare, endSquare);
    deselectPiece();
  };

  const squareGameState = {
    isBoardFlipped,
    isKingInCheck: gameManager.isKingInCheck,
    kingSquare: gameManager.kingSquare,
    onSquareClick: handleClickToMove,
    selectedPieceSquare,
    previousMoveSquares:
      highlighter.highlightedSquares.previousMoveSquares.slice(-2),
    dragStartSquare,
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        id="chessboard"
        className="relative grid grid-cols-8 w-[90vmin] h-[90vmin] lg:w-[70vmin] lg:h-[70vmin] touch-none"
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
              square={{ row: rowIndex, col: colIndex }}
              isValidMove={isMoveValid(rowIndex, colIndex)}
              {...squareGameState}
            >
              {square.piece && square.piece.isAlive && (
                <ChessPiece
                  type={square.piece.type}
                  color={square.piece.color}
                  square={{ row: rowIndex, col: colIndex }}
                />
              )}
            </ChessSquare>
          ))
        )}
      </div>
    </DndContext>
  );
};
