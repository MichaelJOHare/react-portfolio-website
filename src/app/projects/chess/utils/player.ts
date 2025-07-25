import { isValidCastlingMove, simulateMove, isKingInCheck } from ".";
import {
  CastlingMove,
  Move,
  MoveHistory,
  MoveType,
  Piece,
  Player,
  PlayerColor,
  PlayerType,
  Square,
} from "../types";

export const createPlayer = (color: PlayerColor, type: PlayerType): Player => ({
  id: color === PlayerColor.WHITE ? "white" : "black",
  color,
  type,
});

export const getPossibleMoves = (
  player: Player,
  board: Square[][],
  piecesByPlayer: Map<string, Piece[]>,
  moveHistory: MoveHistory[],
) => {
  const playerPieces = piecesByPlayer.get(player.id);
  const playerMoves: Move[] = [];
  const movesHistory = moveHistory.map((r) => r.move);

  playerPieces?.forEach((piece) => {
    if (piece.isAlive) {
      const pieceMoves = piece.movementStrategy(board, piece, movesHistory);
      playerMoves.push(...pieceMoves);
    }
  });

  return playerMoves;
};

export const getPlayerMoves = (
  player: Player,
  opponent: Player,
  board: Square[][],
  piecesByPlayer: Map<string, Piece[]>,
  moveHistory: MoveHistory[],
): Move[] => {
  const legalMoves: Move[] = [];
  const pieceMoves = getPossibleMoves(
    player,
    board,
    piecesByPlayer,
    moveHistory,
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

    const opponentMoves = getPossibleMoves(
      opponent,
      tempBoard,
      tempPiecesByPlayer,
      moveHistory,
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

export const isComputerPlaying = (player1: Player, player2: Player) => {
  return (
    player1.type === PlayerType.COMPUTER || player2.type === PlayerType.COMPUTER
  );
};
