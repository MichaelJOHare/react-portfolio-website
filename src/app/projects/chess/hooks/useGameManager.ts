import { useState } from "react";
import {
  createPlayer,
  defaultBoard,
  setupPieces,
  cloneBoard,
  getPlayerLegalMoves,
  loadGameStateFromFEN,
  initializePiecesByPlayer,
  executePlayerMove,
  undoRedoMoves,
} from "../utils";
import {
  Piece,
  PlayerColor,
  PlayerType,
  PieceType,
  Move,
  PromotionMove,
  MoveHistory,
  GameState,
} from "../types";

export const useGameManager = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: defaultBoard(),
    players: [
      createPlayer(PlayerColor.WHITE, PlayerType.HUMAN),
      createPlayer(PlayerColor.BLACK, PlayerType.HUMAN),
    ],
    piecesByPlayer: new Map<string, Piece[]>(),
    capturedPieces: [],
    kingSquare: undefined,
    isKingInCheck: false,
    currentPlayerIndex: 0,
    moveHistory: [],
    undoneMoveHistory: [],
    halfMoveClock: 0,
    fullMoveNumber: 1,
  });

  const initializeBoard = () => {
    const setup = setupPieces();
    const whitePlayer = gameState.players[0];
    const blackPlayer = gameState.players[1];
    let result = {
      board: cloneBoard(gameState.board),
      piecesByPlayer: new Map<string, Piece[]>(),
    };

    setup.forEach(
      ({ type, whitePositions, blackPositions, movementStrategy }) => {
        result = initializePiecesByPlayer(
          result.board,
          result.piecesByPlayer,
          whitePositions,
          whitePlayer,
          PlayerColor.WHITE,
          type,
          movementStrategy,
        );

        result = initializePiecesByPlayer(
          result.board,
          result.piecesByPlayer,
          blackPositions,
          blackPlayer,
          PlayerColor.BLACK,
          type,
          movementStrategy,
        );
      },
    );

    setGameState((prev) => ({
      ...prev,
      board: result.board,
      piecesByPlayer: result.piecesByPlayer,
    }));
  };

  const getLegalMoves = () => {
    const { players, currentPlayerIndex } = gameState;
    const player = players[currentPlayerIndex];
    const opponent = players[1 - currentPlayerIndex];
    return getPlayerLegalMoves(
      player,
      opponent,
      gameState.board,
      gameState.piecesByPlayer,
      gameState.moveHistory,
    );
  };

  const executeMove = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    playerMoves: Move[],
    promotionType?: PieceType,
    remainingUndoneMoves?: MoveHistory[],
  ) => {
    const { board } = gameState;
    const piece = board[startRow][startCol].piece;
    if (!piece) return;
    const validMove = playerMoves.find(
      (move) =>
        move.piece.id === piece.id &&
        move.from.row === startRow &&
        move.from.col === startCol &&
        move.to.row === endRow &&
        move.to.col === endCol &&
        (promotionType
          ? (move as PromotionMove).promotionType === promotionType
          : true),
    );
    if (!validMove) return;
    const updatedState = executePlayerMove(
      gameState,
      validMove,
      remainingUndoneMoves,
    );

    setGameState((prev) => ({
      ...prev,
      ...updatedState,
    }));
  };

  const replayMoves = (count: number, isUndo: boolean) => {
    if (count <= 0) return;
    const updatedState = undoRedoMoves(gameState, count, isUndo);
    setGameState((prev) => ({
      ...prev,
      ...updatedState,
    }));
  };

  const loadFromFEN = (fenString: string) => {
    const newGameState = loadGameStateFromFEN(fenString, gameState);
    if (newGameState) {
      const freshState = {
        ...newGameState,
        moveHistory: [],
        undoneMoveHistory: [],
        capturedPieces: [],
      };

      setGameState((prev) => ({
        ...prev,
        ...freshState,
      }));
      return true;
    }

    return false;
  };

  return {
    ...gameState,
    setGameState,
    initializeBoard,
    getLegalMoves,
    replayMoves,
    executeMove,
    loadFromFEN,
  };
};
