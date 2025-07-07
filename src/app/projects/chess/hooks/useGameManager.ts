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
  moveHistory: Move[];
  undoneMoves: Move[];
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
    undoneMoves: [],
    halfMoveClock: 0,
    fullMoveNumber: 1,
  });

  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  const initializeBoard = () => {
    const setup = setupPieces(isBoardFlipped);
    const newBoard = gameState.board.map((row) =>
      row.map((square) => ({ ...square }))
    );
    let newPiecesByPlayer = new Map();

    [PlayerColor.WHITE, PlayerColor.BLACK].forEach((color) => {
      const isWhite = color === PlayerColor.WHITE;
      const rowOffset = isBoardFlipped ? (isWhite ? 0 : 7) : isWhite ? 7 : 0;
      const pawnRow = isBoardFlipped ? (isWhite ? 1 : 6) : isWhite ? 6 : 1;

      setup.forEach(({ type, positions, movementStrategy }) => {
        positions.forEach(({ row, col }) => {
          const player = isWhite ? player1 : player2; // change in future for vs computer
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

    playerPieces?.forEach((piece) => {
      if (piece.isAlive) {
        const pieceMoves = piece.movementStrategy(
          board,
          piece,
          isBoardFlipped,
          gameState.moveHistory
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

  const undoMove = () => {
    if (gameState.moveHistory.length < 1) return;
  };

  const redoMove = () => {};

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
      board[captured.currentSquare.row][captured.currentSquare.col].piece =
        undefined;
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
    promotionType?: PieceType
  ) => {
    const piece = gameState.board[startRow][startCol]?.piece;
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

    const newBoard = gameState.board.map((row) =>
      row.map((square) => ({ ...square }))
    );

    const { updatedPieces, capturedPieces, halfMoveClock, fullMoveNumber } =
      executeMoveByType(validMove, newBoard);

    const updatedPiecesByPlayer = new Map(gameState.piecesByPlayer);
    updatedPieces.forEach((updatedPiece) => {
      const playerPieces =
        updatedPiecesByPlayer.get(updatedPiece.player.id) || [];
      const updatedPlayerPieces = playerPieces.map((p) =>
        p.id === updatedPiece.id ? updatedPiece : p
      );
      updatedPiecesByPlayer.set(updatedPiece.player.id, updatedPlayerPieces);
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
      moveHistory: [...prevState.moveHistory, validMove],
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

  return {
    ...gameState,
    setGameState,
    initializeBoard,
    getLegalMoves,
    executeMove,
    undoMove,
    redoMove,
  };
};
