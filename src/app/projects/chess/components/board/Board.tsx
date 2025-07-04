import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { useChessGame } from "../../hooks/useChessGame";
import { usePieceSelection } from "../../hooks/usePieceSelection";
import { Square } from "../../types";
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
  const { board } = gameManager;
  const {
    selectedPieceSquare,
    dragStartSquare,
    validMoves,
    handleClick,
    handleDragStart,
    handleDragEnd,
  } = usePieceSelection(gameManager, highlighter);

  const isMoveValid = (row: number, col: number) =>
    validMoves.some((move) => move.row === row && move.col === col);

  const parseSquareId = (id: string): Square => {
    const [row, col] = id.split("-").map(Number);
    return { row, col };
  };

  const onDragStart = (event: DragStartEvent) => {
    const { row, col } = parseSquareId(event.active.id as string);
    handleDragStart(row, col);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const start = parseSquareId(active.id as string);
    const end = parseSquareId(over.id as string);

    handleDragEnd(start, end);
  };

  const squareGameState = {
    isBoardFlipped,
    isKingInCheck: gameManager.isKingInCheck,
    kingSquare: gameManager.kingSquare,
    onSquareClick: handleClick,
    selectedPieceSquare,
    previousMoveSquares:
      highlighter.highlightedSquares.previousMoveSquares.slice(-2),
    dragStartSquare,
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
