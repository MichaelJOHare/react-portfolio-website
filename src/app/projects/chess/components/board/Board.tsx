import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ChessPiece } from "./ChessPiece";
import { ChessSquare } from "./ChessSquare";
import { Arrow } from "../ui/drawings/Arrow";
import { Circle } from "../ui/drawings/Circle";
import { PromotionPanel } from "../ui/PromotionPanel";
import { Square } from "../../types";
import { useGame } from "../../context/GameContext";
import { getStockfishArrow } from "../../utils/stockfish";

export const Board = () => {
  const {
    gameManager,
    highlighter,
    pieceSelector,
    promotionHandler,
    isBoardFlipped,
    stockfishEnabled,
  } = useGame();
  const { board } = gameManager;
  const { handleDragStart, handleDragEnd } = pieceSelector;
  const {
    tempDrawings,
    highlightedSquares,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  } = highlighter;

  const stockfishArrow = getStockfishArrow(
    highlightedSquares.stockfishBestMove,
  );

  const shouldShowStockfishArrow = () =>
    highlightedSquares.stockfishBestMove && stockfishEnabled;

  const parseSquareId = (id: string): Square => {
    const [row, col] = id.split("-").map(Number);
    return { row, col };
  };

  const isSquareToHide = (square: Square) => {
    return promotionHandler.squaresToHide.find(
      (s) => s.row === square.row && s.col === square.col,
    );
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

  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {/* try to make corner squares rounded, right side not rounded when sf enabled */}
      <div
        id="chessboard"
        className={`${isBoardFlipped ? "rotate-180" : ""} relative grid aspect-square h-full w-full touch-none grid-cols-8`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onContextMenu={(e) => {
          preventContextMenu(e);
        }}
      >
        {promotionHandler.isShown && (
          <div className="absolute inset-0 top-0 left-0 z-20 bg-black/20">
            <PromotionPanel />
          </div>
        )}
        {/* arrows and circles drawn while holding down right click */}
        {<Arrow {...tempDrawings.arrowCoordinates} />}
        {<Circle {...tempDrawings.circleCoordinates} />}
        {/* arrows and circles that stay after drawing completes, keys used for removing arrows/circles by drawing back over them */}
        {highlightedSquares.arrowsDrawnOnSquares.map((arrow, index) => (
          <Arrow key={`arrow-${index}`} {...arrow} />
        ))}
        {highlightedSquares.circlesDrawnOnSquares.map((circle, index) => (
          <Circle key={`circle-${index}`} {...circle} />
        ))}
        {shouldShowStockfishArrow() && (
          <Arrow key="stockfish-arrow" {...stockfishArrow} />
        )}
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <ChessSquare key={`${rowIndex}-${colIndex}`} square={square}>
              {square.piece &&
                square.piece.isAlive &&
                !isSquareToHide(square) && (
                  <ChessPiece
                    type={square.piece.type}
                    color={square.piece.color}
                    square={square}
                  />
                )}
            </ChessSquare>
          )),
        )}
      </div>
    </DndContext>
  );
};
