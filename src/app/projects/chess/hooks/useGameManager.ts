import { useState } from "react";
import {
  Player,
  Piece,
  PlayerColor,
  PlayerType,
  PieceType,
  Move,
  Square,
  PromotionMove,
  MoveHistory,
} from "../types";
import {
  createPlayer,
  createPiece,
  defaultBoard,
  setupPieces,
  cloneBoard,
  createSquare,
  clonePiece,
  undoMoveByType,
  executeMoveByType,
  getCheckStatus,
  getLegalMovesFor,
  updatePiecesByPlayer,
} from "../utils";

type GameState = {
  board: Square[][];
  players: Player[];
  piecesByPlayer: Map<string, Piece[]>;
  currentPlayerIndex: number;
  currentPlayerMoves: Move[];
  capturedPieces: Piece[];
  kingSquare: Square | undefined;
  isKingInCheck: boolean;
  moveHistory: MoveHistory[];
  undoneMoveHistory: MoveHistory[];
  halfMoveClock: number;
  fullMoveNumber: number;
};

export const useGameManager = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: defaultBoard(),
    players: [
      createPlayer(PlayerColor.WHITE, PlayerType.HUMAN),
      createPlayer(PlayerColor.BLACK, PlayerType.HUMAN),
    ],
    piecesByPlayer: new Map<string, Piece[]>(),
    currentPlayerMoves: [],
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
    const newBoard = cloneBoard(gameState.board);
    const newPiecesByPlayer = new Map();
    const whitePlayer = gameState.players[0];
    const blackPlayer = gameState.players[1];

    [PlayerColor.WHITE, PlayerColor.BLACK].forEach((color) => {
      const isWhite = color === PlayerColor.WHITE;
      const rowOffset = isWhite ? 7 : 0;
      const pawnRow = isWhite ? 6 : 1;

      setup.forEach(({ type, positions, movementStrategy }) => {
        positions.forEach(({ row, col }) => {
          const player = isWhite ? whitePlayer : blackPlayer;
          const pieceRow =
            row + (type === PieceType.PAWN ? pawnRow - 1 : rowOffset);
          const square = gameState.board[pieceRow][col];
          const hasMoved =
            type === PieceType.ROOK || type === PieceType.KING
              ? false
              : undefined;

          const piece = createPiece(
            player,
            type,
            color,
            square,
            movementStrategy,
            true,
            hasMoved,
          );

          newBoard[pieceRow][col].piece = piece;
          const playerPieces = newPiecesByPlayer.get(player.id) || [];
          newPiecesByPlayer.set(player.id, [...playerPieces, piece]);
        });
      });
    });

    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      piecesByPlayer: newPiecesByPlayer,
    }));
  };

  const getLegalMoves = () => {
    const { players, currentPlayerIndex } = gameState;
    const player = players[currentPlayerIndex];
    const opponent = players[1 - currentPlayerIndex];
    return getLegalMovesFor(
      player,
      opponent,
      gameState.board,
      gameState.piecesByPlayer,
      gameState.moveHistory,
    );
  };

  const replayMoves = (count: number, isUndo: boolean) => {
    if (count <= 0) return;

    const {
      board,
      players,
      currentPlayerIndex,
      moveHistory,
      undoneMoveHistory,
      capturedPieces,
      piecesByPlayer,
    } = gameState;
    let { halfMoveClock, fullMoveNumber } = gameState;

    const boardCopy = cloneBoard(board);
    const updatedCurrentPlayerIndex = 1 - currentPlayerIndex;
    const newMoveHistory = [...moveHistory];
    const newUndoneMoves = [...undoneMoveHistory];
    let newCaptured = [...capturedPieces];
    let newPiecesByPlayer = new Map(piecesByPlayer);

    for (let i = 0; i < count; i++) {
      if (isUndo) {
        const lastRecord = newMoveHistory.pop();
        if (!lastRecord) break;

        const result = undoMoveByType(
          lastRecord.move,
          boardCopy,
          newCaptured,
          halfMoveClock,
          fullMoveNumber,
        );

        newCaptured = result.capturedPieces;
        newPiecesByPlayer = updatePiecesByPlayer(
          result.updatedPieces,
          newPiecesByPlayer,
        );
        halfMoveClock = result.newHalfMoveClock;
        fullMoveNumber = result.newFullMoveNumber;

        newUndoneMoves.push(lastRecord);
      } else {
        const lastUndone = newUndoneMoves.pop();
        if (!lastUndone) break;

        const { move, causedCheck, causedCheckMate } = lastUndone;

        const result = executeMoveByType(
          move,
          boardCopy,
          halfMoveClock,
          fullMoveNumber,
        );

        newCaptured = [...newCaptured, ...result.capturedPieces];
        newPiecesByPlayer = updatePiecesByPlayer(
          result.updatedPieces,
          newPiecesByPlayer,
        );
        newMoveHistory.push({
          move,
          causedCheck,
          causedCheckMate,
        });

        halfMoveClock = result.newHalfMoveClock;
        fullMoveNumber = result.newFullMoveNumber;
      }
    }

    const { isKingInCheck, kingSquare } = getCheckStatus(
      boardCopy,
      players[currentPlayerIndex],
      players[1 - currentPlayerIndex],
      newPiecesByPlayer,
      newMoveHistory,
    );

    setGameState((prev) => ({
      ...prev,
      board: boardCopy,
      moveHistory: newMoveHistory,
      undoneMoveHistory: newUndoneMoves,
      capturedPieces: newCaptured,
      piecesByPlayer: newPiecesByPlayer,
      currentPlayerIndex: updatedCurrentPlayerIndex,
      halfMoveClock,
      fullMoveNumber,
      isKingInCheck,
      kingSquare,
    }));
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
    const {
      board,
      piecesByPlayer,
      players,
      currentPlayerIndex,
      halfMoveClock,
      fullMoveNumber,
      moveHistory,
    } = gameState;

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
    const player = players[currentPlayerIndex];
    const opponent = players[1 - currentPlayerIndex];
    const newBoard = cloneBoard(board);
    const newPiecesByPlayer = new Map(piecesByPlayer);

    const {
      updatedPieces,
      capturedPieces,
      newHalfMoveClock,
      newFullMoveNumber,
    } = executeMoveByType(validMove, newBoard, halfMoveClock, fullMoveNumber);

    const updatedPiecesByPlayer = updatePiecesByPlayer(
      updatedPieces,
      newPiecesByPlayer,
    );

    const tempMoveHistory = [
      ...moveHistory,
      {
        move: validMove,
        causedCheck: false,
        causedCheckMate: false,
      },
    ];
    const { isKingInCheck, kingSquare } = getCheckStatus(
      newBoard,
      opponent,
      player,
      updatedPiecesByPlayer,
      tempMoveHistory,
    );

    const moves = getLegalMovesFor(
      opponent,
      player,
      newBoard,
      updatedPiecesByPlayer,
      tempMoveHistory,
    );

    const causedCheckMate = isKingInCheck && moves.length === 0;
    const causedCheck = isKingInCheck && !causedCheckMate;

    const updatedMoveHistory = [...moveHistory];
    updatedMoveHistory.push({
      move: validMove,
      causedCheck,
      causedCheckMate,
    });

    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      piecesByPlayer: updatedPiecesByPlayer,
      currentPlayerIndex: prev.currentPlayerIndex === 0 ? 1 : 0,
      moveHistory: updatedMoveHistory,
      undoneMoveHistory: remainingUndoneMoves ? remainingUndoneMoves : [],
      halfMoveClock: newHalfMoveClock,
      fullMoveNumber: newFullMoveNumber,
      capturedPieces: [...prev.capturedPieces, ...capturedPieces],
      isKingInCheck,
      kingSquare,
    }));
  };

  return {
    ...gameState,
    setGameState,
    initializeBoard,
    getLegalMoves,
    replayMoves,
    executeMove,
  };
};
