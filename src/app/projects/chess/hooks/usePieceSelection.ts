import { useState } from "react";
import { Piece, PlayerType, Square } from "../types";

type UsePieceSelectionProps = {
  board: (Square & { piece?: Piece })[][];
  currentPlayer: { type: PlayerType };
  getLegalMoves: () => {
    piece: Piece;
    to: Square;
  }[];
  executeMove: (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    moves: { piece: Piece; to: Square }[]
  ) => void;
  highlighter: {
    addPreviousMoveSquares: (start: Square, end: Square) => void;
  };
};

export const usePieceSelection = ({
  board,
  currentPlayer,
  getLegalMoves,
  executeMove,
  highlighter,
}: UsePieceSelectionProps) => {
  const [selectedPieceSquare, setSelectedPieceSquare] = useState<Square>();
  const [dragStartSquare, setDragStartSquare] = useState<Square>();
  const [validMoves, setValidMoves] = useState<Square[]>([]);

  const playerMoves = getLegalMoves();

  const isCurrentPlayerPiece = (piece?: Piece) =>
    piece &&
    piece.player === currentPlayer &&
    piece.player.type !== PlayerType.COMPUTER;

  const isMoveValid = (row: number, col: number) =>
    validMoves.some((s) => s.row === row && s.col === col);

  const deselectPiece = () => {
    setSelectedPieceSquare(undefined);
    setValidMoves([]);
  };

  const selectPiece = (row: number, col: number, piece: Piece | undefined) => {
    const moves = playerMoves
      .filter((m) => m.piece === piece)
      .map((m) => ({ row: m.to.row, col: m.to.col }));
    setSelectedPieceSquare({ row, col });
    setValidMoves(moves);
  };

  const finalizeMove = (start: Square, end: Square) => {
    executeMove(start.row, start.col, end.row, end.col, playerMoves);
    highlighter.addPreviousMoveSquares(start, end);
    deselectPiece();
  };

  const handleClick = (row: number, col: number) => {
    const piece = board[row][col].piece;
    if (selectedPieceSquare) {
      if (isMoveValid(row, col)) {
        finalizeMove(selectedPieceSquare, { row, col });
      } else if (isCurrentPlayerPiece(piece)) {
        selectPiece(row, col, piece);
      } else {
        deselectPiece();
      }
    } else if (isCurrentPlayerPiece(piece)) {
      selectPiece(row, col, piece);
    }
  };

  const handleDragStart = (row: number, col: number) => {
    const piece = board[row][col].piece;
    if (!isCurrentPlayerPiece(piece)) return;
    deselectPiece();
    selectPiece(row, col, piece);
    setDragStartSquare({ row, col });
  };

  const handleDragEnd = (start: Square, end: Square) => {
    deselectPiece();
    setDragStartSquare(undefined);
    if (start.row === end.row && start.col === end.col) {
      handleClick(start.row, start.col);
    } else if (isMoveValid(end.row, end.col)) {
      finalizeMove(start, end);
    }
  };

  return {
    selectedPieceSquare,
    dragStartSquare,
    validMoves,
    handleClick,
    handleDragStart,
    handleDragEnd,
  };
};
