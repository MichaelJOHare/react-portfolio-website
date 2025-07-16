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
  getEffectiveSquare,
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
    isKingInCheck: false,
    kingSquare: undefined,
    currentPlayerIndex: 0,
    moveHistory: [],
    undoneMoveHistory: [],
    halfMoveClock: 0,
    fullMoveNumber: 1,
  });

  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  const initializeBoard = () => {
    const setup = setupPieces(isBoardFlipped);
    const newBoard = cloneBoard(gameState.board);
    const newPiecesByPlayer = new Map();

    [PlayerColor.WHITE, PlayerColor.BLACK].forEach((color) => {
      const isWhite = color === PlayerColor.WHITE;
      const rowOffset = isBoardFlipped ? (isWhite ? 0 : 7) : isWhite ? 7 : 0;
      const pawnRow = isBoardFlipped ? (isWhite ? 1 : 6) : isWhite ? 6 : 1;

      setup.forEach(({ type, positions, movementStrategy }) => {
        positions.forEach(({ row, col }) => {
          const player = isWhite ? player1 : player2;
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
            hasMoved
          );

          newBoard[pieceRow][col].piece = piece;
          const playerPieces = newPiecesByPlayer.get(player.id) || [];
          newPiecesByPlayer.set(player.id, [...playerPieces, piece]);
        });
      });
    });

    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      piecesByPlayer: newPiecesByPlayer,
    }));
  };

  const getPlayerMoves = (
    player: Player,
    board: Square[][],
    piecesByPlayer: Map<string, Piece[]>
  ) => {
    const playerPieces = piecesByPlayer.get(player.id);
    const playerMoves: Move[] = [];
    const moveHistory = gameState.moveHistory.map((record) => record.move);

    playerPieces?.forEach((piece) => {
      if (piece.isAlive) {
        const pieceMoves = piece.movementStrategy(
          board,
          piece,
          isBoardFlipped,
          moveHistory
        );
        playerMoves.push(...pieceMoves);
      }
    });

    return playerMoves;
  };

  const getLegalMoves = () => {
    const legalMoves: Move[] = [];
    const player = gameState.players[gameState.currentPlayerIndex];
    const opponent = gameState.players[1 - gameState.currentPlayerIndex];
    const pieceMoves = getPlayerMoves(
      player,
      gameState.board,
      gameState.piecesByPlayer
    );

    pieceMoves.forEach((move) => {
      const { tempBoard, capturedPiece } = simulateMove(move, gameState.board);
      const tempPiecesByPlayer = new Map(gameState.piecesByPlayer);
      if (capturedPiece) {
        const opponentPieces = [...(tempPiecesByPlayer.get(opponent.id) ?? [])];
        const updatedPieces = opponentPieces.map((p) =>
          p.id === capturedPiece.id ? { ...p, isAlive: false } : p
        );
        tempPiecesByPlayer.set(opponent.id, updatedPieces);
      }
      const opponentMoves = getPlayerMoves(
        opponent,
        tempBoard,
        tempPiecesByPlayer
      );

      const isCastlingMove = move.type === MoveType.CASTLE;
      const isValidMove = isCastlingMove
        ? isValidCastlingMove(
            move as CastlingMove,
            opponentMoves,
            gameState.board
          )
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
    isBoardFlipped: boolean
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
          isBoardFlipped
        );
        break;
      case MoveType.CASTLE:
        updatedPieces = undoCastlingMove(
          move,
          board,
          wasBoardFlipped,
          isBoardFlipped
        );
        break;
      case MoveType.EP:
        updatedPieces = undoEnPassantMove(
          move,
          board,
          move.capturedPiece,
          wasBoardFlipped,
          isBoardFlipped
        );
        break;
      case MoveType.PROMO:
        updatedPieces = undoPromoMove(
          move,
          board,
          move.capturedPiece,
          wasBoardFlipped,
          isBoardFlipped
        );
        break;
    }

    if (move.capturedPiece) {
      const captured = { ...move.capturedPiece, isAlive: true };
      updatedCapturedPieces = gameState.capturedPieces.filter(
        (piece) => piece.id !== captured.id
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

  const undoMove = (count: number = 1) => {
    if (count <= 0) return;

    const newBoard = cloneBoard(gameState.board);
    const updatedMoveHistory = [...gameState.moveHistory];
    const updatedUndoneMoves = [...gameState.undoneMoveHistory];
    let updatedCapturedPieces = [...gameState.capturedPieces];
    let updatedPiecesByPlayer = new Map(gameState.piecesByPlayer);
    let currentPlayerIndex = gameState.currentPlayerIndex;
    let halfMoveClock = gameState.halfMoveClock;
    let fullMoveNumber = gameState.fullMoveNumber;
    console.log(gameState.moveHistory);

    for (let i = 0; i < count; i++) {
      const lastRecord = updatedMoveHistory.pop();
      if (!lastRecord) break;
      const { move, wasBoardFlipped } = lastRecord;

      const result = undoMoveByType(
        move,
        newBoard,
        wasBoardFlipped,
        isBoardFlipped
      );

      updatedPiecesByPlayer = updatePiecesByPlayer(
        result.updatedPieces,
        updatedPiecesByPlayer
      );
      updatedCapturedPieces = result.capturedPieces;
      halfMoveClock = result.halfMoveClock;
      fullMoveNumber = result.fullMoveNumber;
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
      updatedUndoneMoves.push(lastRecord);
    }

    const { isKingInCheck, kingSquare } = getCheckStatus(
      newBoard,
      gameState.players[1 - currentPlayerIndex],
      gameState.players[currentPlayerIndex],
      updatedPiecesByPlayer
    );

    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      moveHistory: updatedMoveHistory,
      undoneMoveHistory: updatedUndoneMoves,
      capturedPieces: updatedCapturedPieces,
      piecesByPlayer: updatedPiecesByPlayer,
      currentPlayerIndex,
      halfMoveClock,
      fullMoveNumber,
      isKingInCheck,
      kingSquare,
    }));
  };

  const redoMove = () => {
    const lastUndoneRecord = gameState.undoneMoveHistory.at(-1);
    if (!lastUndoneRecord) return;
    const legalMoves = getLegalMoves();
    const { move, wasBoardFlipped } = lastUndoneRecord;

    const undoneMoves = [...gameState.undoneMoveHistory.slice(0, -1)];
    const { from, to, isPromotion } = move;
    const fromSq = getEffectiveSquare(from, wasBoardFlipped, isBoardFlipped);
    const toSq = getEffectiveSquare(to, wasBoardFlipped, isBoardFlipped);

    const promotionType = isPromotion
      ? (move as PromotionMove).promotionType
      : undefined;

    executeMove(
      fromSq.row,
      fromSq.col,
      toSq.row,
      toSq.col,
      legalMoves,
      promotionType,
      undoneMoves
    );
  };

  const executeMoveByType = (
    move: Move,
    board: Square[][]
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
    remainingUndoneMoves?: MoveHistory[]
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
          : true)
    );

    if (!validMove) return;

    const newBoard = cloneBoard(gameState.board);
    const { updatedPieces, capturedPieces, halfMoveClock, fullMoveNumber } =
      executeMoveByType(validMove, newBoard);
    const updatedPiecesByPlayer = updatePiecesByPlayer(updatedPieces);
    const updatedMoveHistory = [...gameState.moveHistory];
    updatedMoveHistory.push({
      move: validMove,
      wasBoardFlipped: isBoardFlipped,
    });
    const { isKingInCheck, kingSquare } = getCheckStatus(
      newBoard,
      gameState.players[1 - gameState.currentPlayerIndex],
      gameState.players[gameState.currentPlayerIndex],
      updatedPiecesByPlayer
    );

    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      piecesByPlayer: updatedPiecesByPlayer,
      currentPlayerIndex: prevState.currentPlayerIndex === 0 ? 1 : 0,
      moveHistory: updatedMoveHistory,
      undoneMoveHistory: remainingUndoneMoves ? remainingUndoneMoves : [],
      halfMoveClock,
      fullMoveNumber,
      capturedPieces: [...prevState.capturedPieces, ...capturedPieces],
      isKingInCheck,
      kingSquare,
    }));
  };

  const simulateMove = (move: Move, board: Square[][]) => {
    const tempBoard = board.map((row) =>
      row.map((square) => ({
        ...square,
        piece: square.piece ? { ...square.piece } : undefined,
      }))
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
    base: Map<string, Piece[]> = new Map(gameState.piecesByPlayer)
  ) => {
    const updatedPiecesByPlayer = new Map(base);
    updatedPieces.forEach((updatedPiece) => {
      const playerPieces =
        updatedPiecesByPlayer.get(updatedPiece.player.id) || [];
      const updatedPlayerPieces = playerPieces.map((p) =>
        p.id === updatedPiece.id ? updatedPiece : p
      );
      updatedPiecesByPlayer.set(updatedPiece.player.id, updatedPlayerPieces);
    });
    return updatedPiecesByPlayer;
  };

  const getCheckStatus = (
    board: Square[][],
    player: Player,
    opponent: Player,
    piecesByPlayer: Map<string, Piece[]>
  ): { isKingInCheck: boolean; kingSquare?: Square } => {
    const playersKing = piecesByPlayer
      .get(player.id)
      ?.find((piece) => piece.type === PieceType.KING);

    if (!playersKing) return { isKingInCheck: false };

    const opponentMoves = getPlayerMoves(opponent, board, piecesByPlayer);
    const kingInCheck = isKingInCheck(opponentMoves);

    return {
      isKingInCheck: kingInCheck,
      kingSquare: kingInCheck ? playersKing.currentSquare : undefined,
    };
  };

  const flipPiecesOnBoard = () => {
    const flippedBoard = gameState.board.map((row) =>
      row.map((square) => createSquare(square.row, square.col, undefined))
    );

    const newPiecesByPlayer = new Map(gameState.piecesByPlayer);

    gameState.piecesByPlayer.forEach((pieces, playerId) => {
      const flippedPieces = pieces
        .filter((piece) => piece.isAlive)
        .map((piece) => {
          const oldRow = piece.currentSquare.row;
          const oldCol = piece.currentSquare.col;
          const newRow = 7 - oldRow;
          const newCol = 7 - oldCol;
          const newSquare = flippedBoard[newRow][newCol];

          const newPiece = {
            ...piece,
            currentSquare: newSquare,
          };

          newSquare.piece = newPiece;
          return newPiece;
        });
      newPiecesByPlayer.set(playerId, flippedPieces);
    });

    setGameState((prev) => ({
      ...prev,
      board: flippedBoard,
      piecesByPlayer: newPiecesByPlayer,
    }));
  };

  return {
    ...gameState,
    setGameState,
    initializeBoard,
    getLegalMoves,
    executeMove,
    undoMove,
    redoMove,
    flipPiecesOnBoard,
  };
};
