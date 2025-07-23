import { fromFEN } from "./FEN";
import { getLegalMovesFor, getPlayerMoves } from "./player";
import {
  GameState,
  Move,
  Square,
  Piece,
  Player,
  MoveHistory,
  PieceType,
} from "../types";
import { applyMove, cloneBoard, isKingInCheck } from "./index";

export const copyGameState = (gameState: GameState): GameState => ({
  ...gameState,
  board: cloneBoard(gameState.board),
  moveHistory: [...gameState.moveHistory],
  undoneMoveHistory: [...gameState.undoneMoveHistory],
  capturedPieces: [...gameState.capturedPieces],
  piecesByPlayer: new Map(gameState.piecesByPlayer),
});

export const loadGameStateFromFEN = (
  fenString: string,
  currentGameState: GameState,
): GameState | null => {
  const whitePlayer = currentGameState.players[0];
  const blackPlayer = currentGameState.players[1];
  const result = fromFEN(fenString, whitePlayer, blackPlayer, currentGameState);

  if (!result.isValid) {
    return null;
  }

  const currentPlayer = currentGameState.players[result.currentPlayerIndex];
  const opponent = currentGameState.players[1 - result.currentPlayerIndex];
  const { isKingInCheck, kingSquare } = getCheckStatus(
    currentPlayer,
    opponent,
    result.board,
    result.piecesByPlayer,
    [],
  );

  const updatedGameState = {
    board: result.board,
    piecesByPlayer: result.piecesByPlayer,
    currentPlayerIndex: result.currentPlayerIndex,
    halfMoveClock: result.halfMoveClock,
    fullMoveNumber: result.fullMoveNumber,
    isKingInCheck,
    kingSquare,
    moveHistory: [],
    undoneMoveHistory: [],
    capturedPieces: [],
  };

  return {
    ...currentGameState,
    ...updatedGameState,
  };
};

export const getCheckStatus = (
  player: Player,
  opponent: Player,
  board: Square[][],
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

export const getGameStatus = (
  board: Square[][],
  currentPlayer: Player,
  opponent: Player,
  piecesByPlayer: Map<string, Piece[]>,
  moveHistory: MoveHistory[],
) => {
  const { isKingInCheck, kingSquare } = getCheckStatus(
    currentPlayer,
    opponent,
    board,
    piecesByPlayer,
    moveHistory,
  );

  const legalMoves = getLegalMovesFor(
    currentPlayer,
    opponent,
    board,
    piecesByPlayer,
    moveHistory,
  );

  return {
    isKingInCheck,
    kingSquare,
    legalMoves,
    causedCheckMate: isKingInCheck && legalMoves.length === 0,
    causedCheck: isKingInCheck && legalMoves.length > 0,
  };
};

export const undoRedoMoves = (
  gameState: GameState,
  count: number,
  isUndo: boolean,
) => {
  const gameStateCopy = copyGameState(gameState);
  const { board, moveHistory, undoneMoveHistory } = gameStateCopy;
  let {
    capturedPieces,
    piecesByPlayer,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
  } = gameStateCopy;

  for (let i = 0; i < count; i++) {
    if (isUndo) {
      const lastRecord = moveHistory.pop();
      if (!lastRecord) break;

      const result = applyMove(
        lastRecord.move,
        board,
        piecesByPlayer,
        capturedPieces,
        halfMoveClock,
        fullMoveNumber,
        true,
      );

      capturedPieces = result.capturedPieces;
      piecesByPlayer = result.updatedPiecesByPlayer;
      halfMoveClock = result.newHalfMoveClock;
      fullMoveNumber = result.newFullMoveNumber;

      undoneMoveHistory.push(lastRecord);
    } else {
      const lastUndone = undoneMoveHistory.pop();
      if (!lastUndone) break;
      const { move, causedCheck, causedCheckMate } = lastUndone;

      const result = applyMove(
        move,
        board,
        piecesByPlayer,
        capturedPieces,
        halfMoveClock,
        fullMoveNumber,
        false,
      );

      capturedPieces = [...capturedPieces, ...result.capturedPieces];
      piecesByPlayer = result.updatedPiecesByPlayer;
      halfMoveClock = result.newHalfMoveClock;
      fullMoveNumber = result.newFullMoveNumber;

      moveHistory.push({
        move,
        causedCheck,
        causedCheckMate,
      });
    }
    currentPlayerIndex = 1 - currentPlayerIndex;
  }

  const gameStatus = getGameStatus(
    board,
    gameState.players[currentPlayerIndex],
    gameState.players[1 - currentPlayerIndex],
    piecesByPlayer,
    moveHistory,
  );

  return {
    board,
    moveHistory,
    undoneMoveHistory,
    capturedPieces,
    piecesByPlayer,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
    isKingInCheck: gameStatus.isKingInCheck,
    kingSquare: gameStatus.kingSquare,
  };
};

export const executePlayerMove = (
  gameState: GameState,
  validMove: Move,
  remainingUndoneMoves?: MoveHistory[],
) => {
  const {
    players,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
    moveHistory,
    capturedPieces,
  } = gameState;
  const player = players[currentPlayerIndex];
  const opponent = players[1 - currentPlayerIndex];
  const newBoard = cloneBoard(gameState.board);
  const newPiecesByPlayer = new Map(gameState.piecesByPlayer);

  const moveResult = applyMove(
    validMove,
    newBoard,
    newPiecesByPlayer,
    [],
    halfMoveClock,
    fullMoveNumber,
    false,
  );

  const tempMoveHistory = [
    ...moveHistory,
    {
      move: validMove,
      causedCheck: false,
      causedCheckMate: false,
    },
  ];

  const gameStatus = getGameStatus(
    newBoard,
    opponent,
    player,
    moveResult.updatedPiecesByPlayer,
    tempMoveHistory,
  );

  const updatedMoveHistory = [...moveHistory];
  updatedMoveHistory.push({
    move: validMove,
    causedCheck: gameStatus.causedCheck,
    causedCheckMate: gameStatus.causedCheckMate,
  });

  return {
    board: newBoard,
    piecesByPlayer: moveResult.updatedPiecesByPlayer,
    currentPlayerIndex: currentPlayerIndex === 0 ? 1 : 0,
    moveHistory: updatedMoveHistory,
    undoneMoveHistory: remainingUndoneMoves ? remainingUndoneMoves : [],
    halfMoveClock: moveResult.newHalfMoveClock,
    fullMoveNumber: moveResult.newFullMoveNumber,
    capturedPieces: [...capturedPieces, ...moveResult.capturedPieces],
    isKingInCheck: gameStatus.isKingInCheck,
    kingSquare: gameStatus.kingSquare,
  };
};
