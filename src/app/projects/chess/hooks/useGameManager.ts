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
  getEffectiveMove,
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

export const useGameManager = (isBoardFlipped: boolean) => {
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
    const setup = setupPieces(isBoardFlipped);
    const newBoard = cloneBoard(gameState.board);
    const newPiecesByPlayer = new Map();
    const whitePlayer = gameState.players[0];
    const blackPlayer = gameState.players[1];

    [PlayerColor.WHITE, PlayerColor.BLACK].forEach((color) => {
      const isWhite = color === PlayerColor.WHITE;
      const rowOffset = isBoardFlipped ? (isWhite ? 0 : 7) : isWhite ? 7 : 0;
      const pawnRow = isBoardFlipped ? (isWhite ? 1 : 6) : isWhite ? 6 : 1;

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
    const player = gameState.players[gameState.currentPlayerIndex];
    const opponent = gameState.players[1 - gameState.currentPlayerIndex];
    return getLegalMovesFor(
      player,
      opponent,
      gameState.board,
      gameState.piecesByPlayer,
      gameState.moveHistory,
      isBoardFlipped,
    );
  };

  const replayMoves = (count: number, isUndo: boolean) => {
    if (count <= 0) return;

    const {
      board,
      players,
      moveHistory,
      undoneMoveHistory,
      capturedPieces,
      piecesByPlayer,
    } = gameState;
    let { currentPlayerIndex, halfMoveClock, fullMoveNumber } = gameState;

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
          lastRecord.wasBoardFlipped,
          isBoardFlipped,
          halfMoveClock,
          fullMoveNumber,
        );

        newCaptured = result.capturedPieces;
        newPiecesByPlayer = updatePiecesByPlayer(
          result.updatedPieces,
          newPiecesByPlayer,
        );
        halfMoveClock = result.updatedHalfMoveClock;
        fullMoveNumber = result.updatedFullMoveNumber;

        newUndoneMoves.push(lastRecord);
      } else {
        const lastUndone = newUndoneMoves.pop();
        if (!lastUndone) break;

        const { move, wasBoardFlipped, causedCheck, causedCheckMate } =
          lastUndone;
        const effectiveMove = getEffectiveMove(
          move,
          wasBoardFlipped,
          isBoardFlipped,
        );

        const result = executeMoveByType(
          effectiveMove,
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
          wasBoardFlipped,
          causedCheck,
          causedCheckMate,
        });

        halfMoveClock = result.updatedHalfMoveClock;
        fullMoveNumber = result.updatedFullMoveNumber;
      }
    }

    const { isKingInCheck, kingSquare } = getCheckStatus(
      boardCopy,
      players[currentPlayerIndex],
      players[1 - currentPlayerIndex],
      newPiecesByPlayer,
      newMoveHistory,
      isBoardFlipped,
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
      updatedHalfMoveClock,
      updatedFullMoveNumber,
    } = executeMoveByType(validMove, newBoard, halfMoveClock, fullMoveNumber);

    const updatedPiecesByPlayer = updatePiecesByPlayer(
      updatedPieces,
      newPiecesByPlayer,
    );

    const tempMoveHistory = [
      ...moveHistory,
      {
        move: validMove,
        wasBoardFlipped: isBoardFlipped,
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
      isBoardFlipped,
    );

    const moves = getLegalMovesFor(
      opponent,
      player,
      newBoard,
      updatedPiecesByPlayer,
      tempMoveHistory,
      isBoardFlipped,
    );

    const causedCheckMate = isKingInCheck && moves.length === 0;
    const causedCheck = isKingInCheck && !causedCheckMate;

    const updatedMoveHistory = [...moveHistory];
    updatedMoveHistory.push({
      move: validMove,
      wasBoardFlipped: isBoardFlipped,
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
      halfMoveClock: updatedHalfMoveClock,
      fullMoveNumber: updatedFullMoveNumber,
      capturedPieces: [...prev.capturedPieces, ...capturedPieces],
      isKingInCheck,
      kingSquare,
    }));
  };

  const flipPiecesOnBoard = () => {
    const flippedBoard = gameState.board.map((row) =>
      row.map((square) => createSquare(square.row, square.col, undefined)),
    );

    const newPiecesByPlayer = new Map<string, Piece[]>();

    gameState.board.forEach((row) =>
      row.forEach((square) => {
        const piece = square.piece;
        if (!piece || !piece.isAlive) return;

        const newRow = 7 - piece.currentSquare.row;
        const newCol = 7 - piece.currentSquare.col;
        const newSquare = flippedBoard[newRow][newCol];
        const newPiece = clonePiece(piece, newSquare);
        newSquare.piece = newPiece;

        const playerPieces = newPiecesByPlayer.get(piece.player.id) || [];
        playerPieces.push(newPiece);
        newPiecesByPlayer.set(piece.player.id, playerPieces);
      }),
    );

    const newKingSquare = gameState.kingSquare && {
      row: 7 - gameState.kingSquare.row,
      col: 7 - gameState.kingSquare.col,
    };

    setGameState((prev) => ({
      ...prev,
      board: flippedBoard,
      piecesByPlayer: newPiecesByPlayer,
      kingSquare: newKingSquare,
    }));
  };

  return {
    ...gameState,
    setGameState,
    initializeBoard,
    getLegalMoves,
    replayMoves,
    executeMove,
    flipPiecesOnBoard,
  };
};
