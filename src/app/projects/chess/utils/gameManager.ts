import { isKingInCheck } from "./board";
import { isValidCastlingMove } from "./move";
import {
  CastlingMove,
  Move,
  MoveHistory,
  MoveType,
  Piece,
  PieceType,
  Player,
  Square,
} from "../types";

export const getLegalMovesFor = (
  player: Player,
  opponent: Player,
  board: Square[][],
  piecesByPlayer: Map<string, Piece[]>,
  moveHistory: MoveHistory[],
  isBoardFlipped: boolean,
): Move[] => {
  const legalMoves: Move[] = [];
  const pieceMoves = getPlayerMoves(
    player,
    board,
    piecesByPlayer,
    moveHistory,
    isBoardFlipped,
  );

  pieceMoves.forEach((move) => {
    const { tempBoard, capturedPiece } = simulateMove(move, board);

    const tempPiecesByPlayer = new Map(piecesByPlayer);
    if (capturedPiece) {
      const opponentPieces = [...(tempPiecesByPlayer.get(opponent.id) ?? [])];
      const updatedPieces = opponentPieces.map((p) =>
        p.id === capturedPiece.id ? { ...p, isAlive: false } : p,
      );
      tempPiecesByPlayer.set(opponent.id, updatedPieces);
    }

    const opponentMoves = getPlayerMoves(
      opponent,
      tempBoard,
      tempPiecesByPlayer,
      moveHistory,
      isBoardFlipped,
    );

    const isCastlingMove = move.type === MoveType.CASTLE;
    const isValidMove = isCastlingMove
      ? isValidCastlingMove(move as CastlingMove, opponentMoves, board)
      : !isKingInCheck(opponentMoves);

    if (isValidMove) {
      legalMoves.push(move);
    }
  });

  return legalMoves;
};

export const getPlayerMoves = (
  player: Player,
  board: Square[][],
  piecesByPlayer: Map<string, Piece[]>,
  moveHistory: MoveHistory[],
  isBoardFlipped: boolean,
) => {
  const playerPieces = piecesByPlayer.get(player.id);
  const playerMoves: Move[] = [];
  const movesHistory = moveHistory.map((r) => r.move);

  playerPieces?.forEach((piece) => {
    if (piece.isAlive) {
      const pieceMoves = piece.movementStrategy(
        board,
        piece,
        isBoardFlipped,
        movesHistory,
      );
      playerMoves.push(...pieceMoves);
    }
  });

  return playerMoves;
};

export const simulateMove = (move: Move, board: Square[][]) => {
  const tempBoard = board.map((row) =>
    row.map((square) => ({
      ...square,
      piece: square.piece ? { ...square.piece } : undefined,
    })),
  );

  const { piece, from, to, capturedPiece } = move;

  const tempCaptured = capturedPiece
    ? { ...capturedPiece, isAlive: false }
    : undefined;

  tempBoard[to.row][to.col].piece = { ...piece };
  tempBoard[from.row][from.col].piece = undefined;

  return { tempBoard, capturedPiece: tempCaptured };
};

export const getCheckStatus = (
  board: Square[][],
  player: Player,
  opponent: Player,
  piecesByPlayer: Map<string, Piece[]>,
  moveHistory: MoveHistory[],
  isBoardFlipped: boolean,
): { isKingInCheck: boolean; kingSquare?: Square } => {
  const playersKing = piecesByPlayer
    .get(player.id)
    ?.find((piece) => piece.type === PieceType.KING);

  if (!playersKing) return { isKingInCheck: false };

  const opponentMoves = getPlayerMoves(
    opponent,
    board,
    piecesByPlayer,
    moveHistory,
    isBoardFlipped,
  );
  const kingInCheck = isKingInCheck(opponentMoves);

  return {
    isKingInCheck: kingInCheck,
    kingSquare: kingInCheck ? playersKing.currentSquare : undefined,
  };
};

export const updatePiecesByPlayer = (
  updatedPieces: Piece[],
  base: Map<string, Piece[]>,
) => {
  const updatedPiecesByPlayer = new Map(base);
  updatedPieces.forEach((updatedPiece) => {
    const playerPieces =
      updatedPiecesByPlayer.get(updatedPiece.player.id) || [];
    const updatedPlayerPieces = playerPieces.map((p) =>
      p.id === updatedPiece.id ? updatedPiece : p,
    );
    updatedPiecesByPlayer.set(updatedPiece.player.id, updatedPlayerPieces);
  });
  return updatedPiecesByPlayer;
};
