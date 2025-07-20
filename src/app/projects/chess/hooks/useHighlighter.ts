import { useState } from "react";
import {
  Move,
  Square,
  ArrowProps,
  CircleProps,
  ChessEngineMove,
} from "../types";

type HighlighterState = {
  legalMoveSquares: Move[];
  arrowCoordinates: ArrowProps;
  circleCoordinates: CircleProps;
};

type HighlightedSquares = {
  previousMoveSquares: Square[];
  arrowsDrawnOnSquares: ArrowProps[];
  circlesDrawnOnSquares: CircleProps[];
  stockfishBestMove: ChessEngineMove | null;
};

export const useHighlighter = (isBoardFlipped: boolean) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasMovedOutOfSquare, setHasMovedOutOfSquare] = useState(false);
  const [originalSquare, setOriginalSquare] = useState<Square | null>(null);

  const [tempDrawings, setTempDrawings] = useState<HighlighterState>({
    legalMoveSquares: [],
    arrowCoordinates: emptyArrow(),
    circleCoordinates: emptyCircle(),
  });

  const [highlightedSquares, setHighlightedSquares] =
    useState<HighlightedSquares>({
      previousMoveSquares: [],
      arrowsDrawnOnSquares: [],
      circlesDrawnOnSquares: [],
      stockfishBestMove: null,
    });

  const calculateArrowCoords = (from: Square, to: Square) => ({
    x1: from.col * 12.5 + 6.25,
    y1: from.row * 12.5 + 6.25,
    x2: to.col * 12.5 + 6.25,
    y2: to.row * 12.5 + 6.25,
  });

  const calculateCircleCoords = (square: Square) => ({
    cx: square.col * 12.5 + 6.25,
    cy: square.row * 12.5 + 6.25,
  });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.button === 0) {
      clearDrawnHighlights();
    } else if (e.button === 2) {
      const square = getSquareFromCoordinates(e.clientX, e.clientY);
      if (!square) return;

      setOriginalSquare(square);
      setIsDrawing(true);
      setHasMovedOutOfSquare(false);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing || e.buttons !== 2) return;

    const currentSquare = getSquareFromCoordinates(e.clientX, e.clientY);
    if (!currentSquare || !originalSquare) return;

    if (
      currentSquare.row !== originalSquare.row ||
      currentSquare.col !== originalSquare.col
    ) {
      setTempDrawings((prev) => ({
        ...prev,
        arrowCoordinates: calculateArrowCoords(originalSquare, currentSquare),
        circleCoordinates: emptyCircle(),
      }));
      setHasMovedOutOfSquare(true);
    } else if (hasMovedOutOfSquare || (!hasMovedOutOfSquare && isDrawing)) {
      setTempDrawings((prev) => ({
        ...prev,
        arrowCoordinates: emptyArrow(),
        circleCoordinates: calculateCircleCoords(originalSquare),
      }));
      setHasMovedOutOfSquare(false);
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing || e.button !== 2) return;

    const currentSquare = getSquareFromCoordinates(e.clientX, e.clientY);
    if (!originalSquare) return;

    if (!hasMovedOutOfSquare) {
      toggleCircle(calculateCircleCoords(originalSquare));
    } else if (currentSquare) {
      toggleArrow(calculateArrowCoords(originalSquare, currentSquare));
    }

    resetDrawingState();
  };

  const toggleCircle = (circleCoords: CircleProps) => {
    setHighlightedSquares((prev) => ({
      ...prev,
      circlesDrawnOnSquares: prev.circlesDrawnOnSquares.some(
        (circle) =>
          circle.cx === circleCoords.cx && circle.cy === circleCoords.cy,
      )
        ? prev.circlesDrawnOnSquares.filter(
            (circle) =>
              !(circle.cx === circleCoords.cx && circle.cy === circleCoords.cy),
          )
        : [...prev.circlesDrawnOnSquares, circleCoords],
    }));
  };

  const toggleArrow = (arrowCoords: ArrowProps) => {
    setHighlightedSquares((prev) => ({
      ...prev,
      arrowsDrawnOnSquares: prev.arrowsDrawnOnSquares.some(
        (arrow) =>
          arrow.x1 === arrowCoords.x1 &&
          arrow.y1 === arrowCoords.y1 &&
          arrow.x2 === arrowCoords.x2 &&
          arrow.y2 === arrowCoords.y2,
      )
        ? prev.arrowsDrawnOnSquares.filter(
            (arrow) =>
              !(
                arrow.x1 === arrowCoords.x1 &&
                arrow.y1 === arrowCoords.y1 &&
                arrow.x2 === arrowCoords.x2 &&
                arrow.y2 === arrowCoords.y2
              ),
          )
        : [...prev.arrowsDrawnOnSquares, arrowCoords],
    }));
  };

  const resetDrawingState = () => {
    setIsDrawing(false);
    setHasMovedOutOfSquare(false);
    setOriginalSquare(null);
    setTempDrawings({
      ...tempDrawings,
      arrowCoordinates: emptyArrow(),
      circleCoordinates: emptyCircle(),
    });
  };

  const getSquareFromCoordinates = (x: number, y: number): Square | null => {
    const board = document.getElementById("chessboard");
    if (!board) return null;

    const rect = board.getBoundingClientRect();
    const squareSize = board.clientWidth / 8;

    let relX = x - rect.left;
    let relY = y - rect.top;

    if (isBoardFlipped) {
      relX = board.clientWidth - relX;
      relY = board.clientHeight - relY;
    }

    return {
      row: Math.floor(relY / squareSize),
      col: Math.floor(relX / squareSize),
    };
  };

  const clearDrawnHighlights = () => {
    setHighlightedSquares((prev) => ({
      ...prev,
      arrowsDrawnOnSquares: [],
      circlesDrawnOnSquares: [],
    }));
  };

  const addPreviousMoveSquares = (startSquare: Square, endSquare: Square) =>
    setHighlightedSquares((prev) => ({
      ...prev,
      previousMoveSquares: [
        ...prev.previousMoveSquares,
        startSquare,
        endSquare,
      ],
    }));

  const clearPreviousMoveSquares = () =>
    setHighlightedSquares((prev) => ({
      ...prev,
      previousMoveSquares: [],
    }));

  const undoPreviousMoveSquares = (count: number) => {
    let updatedPreviousMoveSquares = [
      ...highlightedSquares.previousMoveSquares,
    ];

    for (let i = 0; i < count; i++) {
      updatedPreviousMoveSquares = updatedPreviousMoveSquares.slice(0, -2);
    }
    setHighlightedSquares((prev) => ({
      ...prev,
      previousMoveSquares: updatedPreviousMoveSquares,
    }));
  };

  const addStockfishBestMoveArrow = (move: ChessEngineMove) =>
    setHighlightedSquares((prev) => ({
      ...prev,
      stockfishBestMove: move,
    }));

  const clearStockfishBestMoveArrow = () =>
    setHighlightedSquares((prev) => ({
      ...prev,
      stockfishBestMove: null,
    }));

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    highlightedSquares,
    tempDrawings,
    addPreviousMoveSquares,
    clearPreviousMoveSquares,
    undoPreviousMoveSquares,
    addStockfishBestMoveArrow,
    clearStockfishBestMoveArrow,
    clearDrawnHighlights,
  };
};

// helper functions for empty states
export const emptyArrow = (): ArrowProps => ({ x1: 0, y1: 0, x2: 0, y2: 0 });
export const emptyCircle = (): CircleProps => ({ cx: 0, cy: 0 });
