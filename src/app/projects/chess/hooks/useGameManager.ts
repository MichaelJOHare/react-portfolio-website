import { useState } from "react";
import {
  Player,
  Piece,
  PlayerColor,
  PlayerType,
  PieceType,
  Move,
  MoveType,
  Square,
  CastlingMove,
  PromotionMove,
  MoveHistory,
} from "../types";
import {
  createPlayer,
  createPiece,
  defaultBoard,
  setupPieces,
  executeStandardMove,
  executeCastlingMove,
  executeEnPassantMove,
  executePromoMove,
  isKingInCheck,
  isValidCastlingMove,
  undoStandardMove,
  undoCastlingMove,
  undoEnPassantMove,
  undoPromoMove,
  cloneBoard,
  createSquare,
  clonePiece,
  getEffectiveMove,
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

  const getPlayerMoves = (
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

  const getLegalMoves = () => {
    const player = gameState.players[gameState.currentPlayerIndex];
    const opponent = gameState.players[1 - gameState.currentPlayerIndex];
    return getLegalMovesFor(
      player,
      opponent,
      gameState.board,
      gameState.piecesByPlayer,
      gameState.moveHistory,
    );
  };

  const getLegalMovesFor = (
    player: Player,
    opponent: Player,
    board: Square[][],
    piecesByPlayer: Map<string, Piece[]>,
    moveHistory: MoveHistory[],
  ): Move[] => {
    const legalMoves: Move[] = [];
    const pieceMoves = getPlayerMoves(
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

  const undoMoveByType = (
    move: Move,
    board: Square[][],
    wasBoardFlipped: boolean,
    isBoardFlipped: boolean,
  ): {
    updatedPieces: Piece[];
    capturedPieces: Piece[];
    halfMoveClock: number;
    fullMoveNumber: number;
  } => {
    let updatedCapturedPieces: Piece[] = [...gameState.capturedPieces];
    let updatedPieces: Piece[] = [];

    switch (move.type) {
      case MoveType.STNDRD:
        updatedPieces = undoStandardMove(
          move,
          board,
          move.capturedPiece,
          wasBoardFlipped,
          isBoardFlipped,
        );
        break;
      case MoveType.CASTLE:
        updatedPieces = undoCastlingMove(
          move,
          board,
          wasBoardFlipped,
          isBoardFlipped,
        );
        break;
      case MoveType.EP:
        updatedPieces = undoEnPassantMove(
          move,
          board,
          move.capturedPiece,
          wasBoardFlipped,
          isBoardFlipped,
        );
        break;
      case MoveType.PROMO:
        updatedPieces = undoPromoMove(
          move,
          board,
          move.capturedPiece,
          wasBoardFlipped,
          isBoardFlipped,
        );
        break;
    }

    if (move.capturedPiece) {
      const captured = { ...move.capturedPiece, isAlive: true };
      updatedCapturedPieces = gameState.capturedPieces.filter(
        (piece) => piece.id !== captured.id,
      );
    }

    const halfMoveClock =
      move.piece.type === PieceType.PAWN || move.capturedPiece
        ? gameState.halfMoveClock
        : gameState.halfMoveClock - 1;

    const fullMoveNumber =
      move.piece.color === PlayerColor.BLACK
        ? gameState.fullMoveNumber - 1
        : gameState.fullMoveNumber;

    return {
      updatedPieces,
      capturedPieces: updatedCapturedPieces,
      halfMoveClock,
      fullMoveNumber,
    };
  };

  const replayMoves = (count: number, isUndo: boolean) => {
    if (count <= 0) return;

    const {
      board,
      moveHistory,
      undoneMoveHistory,
      capturedPieces,
      piecesByPlayer,
    } = gameState;
    let { currentPlayerIndex, halfMoveClock, fullMoveNumber } = gameState;

    const boardCopy = cloneBoard(board);
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
          lastRecord.wasBoardFlipped,
          isBoardFlipped,
        );

        newCaptured = result.capturedPieces;
        newPiecesByPlayer = updatePiecesByPlayer(
          result.updatedPieces,
          newPiecesByPlayer,
        );
        halfMoveClock = result.halfMoveClock;
        fullMoveNumber = result.fullMoveNumber;
        currentPlayerIndex = 1 - currentPlayerIndex;

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

        const result = executeMoveByType(effectiveMove, boardCopy);

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

        halfMoveClock = result.halfMoveClock;
        fullMoveNumber = result.fullMoveNumber;
        currentPlayerIndex = 1 - currentPlayerIndex;
      }
    }

    const { isKingInCheck, kingSquare } = getCheckStatus(
      boardCopy,
      gameState.players[currentPlayerIndex],
      gameState.players[1 - currentPlayerIndex],
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
      currentPlayerIndex,
      halfMoveClock,
      fullMoveNumber,
      isKingInCheck,
      kingSquare,
    }));
  };

  const executeMoveByType = (
    move: Move,
    board: Square[][],
  ): {
    updatedPieces: Piece[];
    capturedPieces: Piece[];
    halfMoveClock: number;
    fullMoveNumber: number;
  } => {
    const updatedCapturedPieces: Piece[] = [];
    let updatedPieces: Piece[] = [];

    if (move.capturedPiece) {
      const captured = { ...move.capturedPiece, isAlive: false };
      updatedCapturedPieces.push(captured);
    }

    switch (move.type) {
      case MoveType.STNDRD:
        updatedPieces = executeStandardMove(move, board, move.capturedPiece);
        break;
      case MoveType.CASTLE:
        updatedPieces = executeCastlingMove(move, board);
        break;
      case MoveType.EP:
        updatedPieces = executeEnPassantMove(move, board, move.capturedPiece);
        break;
      case MoveType.PROMO:
        updatedPieces = executePromoMove(move, board, move.capturedPiece);
        break;
    }

    const halfMoveClock =
      move.piece.type === PieceType.PAWN || move.capturedPiece
        ? 0
        : gameState.halfMoveClock + 1;

    const fullMoveNumber =
      move.piece.color === PlayerColor.BLACK
        ? gameState.fullMoveNumber + 1
        : gameState.fullMoveNumber;

    return {
      updatedPieces,
      capturedPieces: updatedCapturedPieces,
      halfMoveClock,
      fullMoveNumber,
    };
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
    const piece = gameState.board[startRow][startCol].piece;
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

    const player = gameState.players[gameState.currentPlayerIndex];
    const opponent = gameState.players[1 - gameState.currentPlayerIndex];
    const newBoard = cloneBoard(gameState.board);
    const { updatedPieces, capturedPieces, halfMoveClock, fullMoveNumber } =
      executeMoveByType(validMove, newBoard);
    const updatedPiecesByPlayer = updatePiecesByPlayer(updatedPieces);

    const tempMoveHistory = [
      ...gameState.moveHistory,
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

    const updatedMoveHistory = [...gameState.moveHistory];
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
      halfMoveClock,
      fullMoveNumber,
      capturedPieces: [...prev.capturedPieces, ...capturedPieces],
      isKingInCheck,
      kingSquare,
    }));
  };

  const simulateMove = (move: Move, board: Square[][]) => {
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

  const updatePiecesByPlayer = (
    updatedPieces: Piece[],
    base: Map<string, Piece[]> = new Map(gameState.piecesByPlayer),
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

  const getCheckStatus = (
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
