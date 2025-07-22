import { useState } from "react";
import {
  GameManager,
  Highlighter,
  Piece,
  PlayerType,
  PromotionHandler,
  Square,
  StockfishHandler,
} from "../types";

export const usePieceSelector = (
  gameManager: GameManager,
  highlighter: Highlighter,
  promotionHandler: PromotionHandler,
  stockfishHandler: StockfishHandler,
) => {
  const { board, getLegalMoves, executeMove, players, currentPlayerIndex } =
    gameManager;
  const { setPromotionDetails } = promotionHandler;
  const { interruptEngineThinking } = stockfishHandler;
  const [selectedPieceSquare, setSelectedPieceSquare] = useState<Square>();
  const [dragStartSquare, setDragStartSquare] = useState<Square>();
  const [validMoves, setValidMoves] = useState<Square[]>([]);

  const isCurrentPlayerPiece = (piece?: Piece) =>
    piece &&
    piece.player === players[currentPlayerIndex] &&
    piece.player.type !== PlayerType.COMPUTER;

  const isMoveValid = (row: number, col: number) =>
    validMoves.some((s) => s.row === row && s.col === col);

  const deselectPiece = () => {
    setSelectedPieceSquare(undefined);
    setValidMoves([]);
  };

  const selectPiece = (row: number, col: number, piece: Piece | undefined) => {
    const moves = getLegalMoves()
      .filter((m) => m.piece === piece)
      .map((m) => ({ row: m.to.row, col: m.to.col }));
    setSelectedPieceSquare({ row, col });
    setValidMoves(moves);
  };

  const finalizeMove = (start: Square, end: Square) => {
    const playerMoves = getLegalMoves();
    const move = playerMoves.find(
      (move) =>
        move.from.row === start.row &&
        move.from.col === start.col &&
        move.to.row === end.row &&
        move.to.col === end.col,
    );

    if (move?.isPromotion) {
      setPromotionDetails(move);
    } else {
      executeMove(start.row, start.col, end.row, end.col, playerMoves);
      deselectPiece();
      highlighter.addPreviousMoveSquares(start, end);
      highlighter.clearStockfishBestMoveArrow();
      interruptEngineThinking();
    }
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
    deselectPiece,
  };
};
