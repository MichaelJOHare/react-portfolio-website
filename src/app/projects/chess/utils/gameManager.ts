import { fromFEN } from "./FEN";
import { getCheckStatus, getLegalMovesFor } from "./player";
import { GameState, Move, Square, Piece, Player, MoveHistory } from "../types";
import { applyMove, cloneBoard } from "./index";

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

  return {
    ...currentGameState,
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
};

export const copyGameState = (gameState: GameState) => ({
  boardCopy: cloneBoard(gameState.board),
  newMoveHistory: [...gameState.moveHistory],
  newUndoneMoves: [...gameState.undoneMoveHistory],
  newCaptured: [...gameState.capturedPieces],
  newPiecesByPlayer: new Map(gameState.piecesByPlayer),
  currentPlayerIndex: gameState.currentPlayerIndex,
  halfMoveClock: gameState.halfMoveClock,
  fullMoveNumber: gameState.fullMoveNumber,
});

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
  const { boardCopy, newMoveHistory, newUndoneMoves } = gameStateCopy;
  let {
    newCaptured,
    newPiecesByPlayer,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
  } = gameStateCopy;

  for (let i = 0; i < count; i++) {
    if (isUndo) {
      const lastRecord = newMoveHistory.pop();
      if (!lastRecord) break;

      const result = applyMove(
        lastRecord.move,
        boardCopy,
        newPiecesByPlayer,
        newCaptured,
        halfMoveClock,
        fullMoveNumber,
        true,
      );

      newCaptured = result.capturedPieces;
      newPiecesByPlayer = result.updatedPiecesByPlayer;
      halfMoveClock = result.newHalfMoveClock;
      fullMoveNumber = result.newFullMoveNumber;

      newUndoneMoves.push(lastRecord);
    } else {
      const lastUndone = newUndoneMoves.pop();
      if (!lastUndone) break;
      const { move, causedCheck, causedCheckMate } = lastUndone;

      const result = applyMove(
        move,
        boardCopy,
        newPiecesByPlayer,
        newCaptured,
        halfMoveClock,
        fullMoveNumber,
        false,
      );

      newCaptured = [...newCaptured, ...result.capturedPieces];
      newPiecesByPlayer = result.updatedPiecesByPlayer;
      halfMoveClock = result.newHalfMoveClock;
      fullMoveNumber = result.newFullMoveNumber;

      newMoveHistory.push({
        move,
        causedCheck,
        causedCheckMate,
      });
    }
    currentPlayerIndex = 1 - currentPlayerIndex;
  }

  const gameStatus = getGameStatus(
    boardCopy,
    gameState.players[currentPlayerIndex],
    gameState.players[1 - currentPlayerIndex],
    newPiecesByPlayer,
    newMoveHistory,
  );

  return {
    board: boardCopy,
    moveHistory: newMoveHistory,
    undoneMoveHistory: newUndoneMoves,
    capturedPieces: newCaptured,
    piecesByPlayer: newPiecesByPlayer,
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
