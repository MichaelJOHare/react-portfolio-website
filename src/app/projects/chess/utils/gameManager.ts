import { isKingInCheck } from "./board";
import { isValidCastlingMove } from "./move";
import { fromFEN } from "./FEN";
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

export const createFreshGameState = (gameState: {
  board: Square[][];
  piecesByPlayer: Map<string, Piece[]>;
  currentPlayerIndex: number;
  halfMoveClock: number;
  fullMoveNumber: number;
  isKingInCheck: boolean;
  kingSquare?: Square;
}) => ({
  board: gameState.board,
  piecesByPlayer: gameState.piecesByPlayer,
  currentPlayerIndex: gameState.currentPlayerIndex,
  halfMoveClock: gameState.halfMoveClock,
  fullMoveNumber: gameState.fullMoveNumber,
  moveHistory: [],
  undoneMoveHistory: [],
  capturedPieces: [],
  isKingInCheck: gameState.isKingInCheck,
  kingSquare: gameState.kingSquare,
});

export const getPlayerMoves = (
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

export const getLegalMovesFor = (
  player: Player,
  opponent: Player,
  board: Square[][],
  piecesByPlayer: Map<string, Piece[]>,
  moveHistory: MoveHistory[],
): Move[] => {
  const legalMoves: Move[] = [];
  const pieceMoves = getPlayerMoves(player, board, piecesByPlayer, moveHistory);

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

export const loadGameStateFromFEN = (
  fenString: string,
  currentGameState: {
    players: Player[];
    board: Square[][];
    piecesByPlayer: Map<string, Piece[]>;
    currentPlayerIndex: number;
    halfMoveClock: number;
    fullMoveNumber: number;
  },
): {
  newGameState: {
    board: Square[][];
    piecesByPlayer: Map<string, Piece[]>;
    currentPlayerIndex: number;
    halfMoveClock: number;
    fullMoveNumber: number;
    isKingInCheck: boolean;
    kingSquare?: Square;
  } | null;
  isValid: boolean;
} => {
  const {
    players,
    board,
    piecesByPlayer,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
  } = currentGameState;

  const whitePlayer = players[0];
  const blackPlayer = players[1];

  const result = fromFEN(fenString, whitePlayer, blackPlayer, {
    board,
    piecesByPlayer,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
  });

  const {
    board: newBoard,
    piecesByPlayer: newPiecesByPlayer,
    currentPlayerIndex: newCurrentPlayerIndex,
    halfMoveClock: newHalfMoveClock,
    fullMoveNumber: newFullMoveNumber,
    isValid,
  } = result;

  if (!isValid) {
    return { newGameState: null, isValid: false };
  }

  const currentPlayer = players[newCurrentPlayerIndex];
  const opponent = players[1 - newCurrentPlayerIndex];
  const { isKingInCheck, kingSquare } = getCheckStatus(
    newBoard,
    currentPlayer,
    opponent,
    newPiecesByPlayer,
    [],
  );

  return {
    newGameState: {
      board: newBoard,
      piecesByPlayer: newPiecesByPlayer,
      currentPlayerIndex: newCurrentPlayerIndex,
      halfMoveClock: newHalfMoveClock,
      fullMoveNumber: newFullMoveNumber,
      isKingInCheck,
      kingSquare,
    },
    isValid: true,
  };
};
