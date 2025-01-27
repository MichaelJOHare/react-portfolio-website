import { useState } from "react";
import {
  GameState,
  Player,
  Piece,
  PlayerColor,
  PlayerType,
  PieceType,
  Move,
  MoveType,
  Square,
  CastlingMove,
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

export const useChessGame = (isBoardFlipped: boolean) => {
  const [gameState, setGameState] = useState<GameState>({
    board: defaultBoard(),
    players: [
      createPlayer(PlayerColor.WHITE, PlayerType.HUMAN),
      createPlayer(PlayerColor.BLACK, PlayerType.HUMAN),
    ],
    piecesByPlayer: new Map<Player, Piece[]>(),
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
    const newBoard = gameState.board;
    let newPiecesByPlayer = new Map();

    [PlayerColor.WHITE, PlayerColor.BLACK].forEach((color) => {
      const isWhite = color === PlayerColor.WHITE;
      const rowOffset = isBoardFlipped ? (isWhite ? 0 : 7) : isWhite ? 7 : 0;
      const pawnRow = isBoardFlipped ? (isWhite ? 1 : 6) : isWhite ? 6 : 1;

      setup.forEach(({ type, positions, movementStrategy }) => {
        positions.forEach(({ row, col }) => {
          const player = color === PlayerColor.WHITE ? player1 : player2;
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
          const playerPieces = newPiecesByPlayer.get(player) || [];
          newPiecesByPlayer.set(player, [...playerPieces, piece]);
        });
      });
    });

    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      piecesByPlayer: newPiecesByPlayer,
    }));
  };

  const getPlayerMoves = (player: Player, board: Square[][]) => {
    const playerPieces = gameState.piecesByPlayer.get(player);
    const playerMoves: Move[] = [];

    playerPieces?.forEach((piece) => {
      if (piece.isAlive) {
        const pieceMoves =
          piece.type === PieceType.PAWN
            ? piece.movementStrategy(
                board,
                piece,
                isBoardFlipped,
                gameState.moveHistory
              )
            : piece.movementStrategy(board, piece, isBoardFlipped);
        playerMoves.push(...pieceMoves);
      }
    });

    return playerMoves;
  };

  const getLegalMoves = () => {
    const legalMoves: Move[] = [];
    const player = gameState.players[gameState.currentPlayerIndex];
    const opponent = gameState.players[1 - gameState.currentPlayerIndex];
    const pieceMoves = getPlayerMoves(player, gameState.board);

    pieceMoves.forEach((move) => {
      const tempBoard = simulateMove(move, gameState.board);
      const opponentMoves = getPlayerMoves(opponent, tempBoard);

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

  const executeMoveByType = (move: Move, board: Square[][]) => {
    const capturePiece = (piece?: Piece) => {
      if (piece) {
        setGameState((prevState) => ({
          ...prevState,
          capturedPieces: [
            ...prevState.capturedPieces,
            { ...piece, isAlive: false },
          ],
        }));
        board[piece.currentSquare.row][piece.currentSquare.col].piece =
          undefined;
      }
    };

    let piecesToUpdate: Piece[] = [];
    capturePiece(move.capturedPiece);

    switch (move.type) {
      case MoveType.STNDRD:
        piecesToUpdate = executeStandardMove(move, board, move.capturedPiece);
        break;

      case MoveType.CASTLE:
        piecesToUpdate = executeCastlingMove(move, board);
        break;

      case MoveType.EP:
        piecesToUpdate = executeEnPassantMove(move, board, move.capturedPiece);
        break;

      case MoveType.PROMO:
        piecesToUpdate = executePromoMove(move, board, move.capturedPiece);
        break;
    }

    const halfMoveClock =
      move.piece.type === PieceType.PAWN || move.capturedPiece
        ? 0
        : gameState.halfMoveClock + 1;

    setGameState((prevState) => ({
      ...prevState,
      halfMoveClock,
      fullMoveNumber:
        move.piece.color === PlayerColor.BLACK
          ? prevState.fullMoveNumber + 1
          : prevState.fullMoveNumber,
    }));

    updatePlayerPieces(piecesToUpdate);
  };

  const executeMove = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    playerMoves: Move[]
  ) => {
    const piece = gameState.board[startRow][startCol]?.piece;
    if (!piece) return;

    const validMove = playerMoves.find(
      ({ piece: movePiece, from, to }) =>
        movePiece.id === piece.id &&
        from.row === startRow &&
        from.col === startCol &&
        to.row === endRow &&
        to.col === endCol
    );

    if (!validMove) return;

    const newBoard = gameState.board.map((row) =>
      row.map((square) => ({ ...square }))
    );

    executeMoveByType(validMove, newBoard);

    setGameState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentPlayerIndex: prevState.currentPlayerIndex === 0 ? 1 : 0,
      moveHistory: [...prevState.moveHistory, validMove],
    }));
    updateCheckStatus(
      newBoard,
      gameState.players[1 - gameState.currentPlayerIndex],
      gameState.players[gameState.currentPlayerIndex]
    );
  };

  const simulateMove = (move: Move, board: Square[][]) => {
    const tempBoard = board.map((row) =>
      row.map((square) => ({ ...square, piece: square.piece }))
    );

    const { piece, from, to } = move;

    tempBoard[to.row][to.col].piece = piece;
    tempBoard[from.row][from.col].piece = undefined;

    return tempBoard;
  };

  const updateCheckStatus = (
    board: Square[][],
    player: Player,
    opponent: Player
  ) => {
    const playersKing = gameState.piecesByPlayer
      .get(player)
      ?.find((piece) => piece.type === PieceType.KING);

    if (!playersKing) {
      return;
    }

    const opponentMoves = getPlayerMoves(opponent, board);
    const kingInCheck = isKingInCheck(opponentMoves);

    setGameState((prev) => ({
      ...prev,
      isKingInCheck: kingInCheck,
      kingSquare: kingInCheck ? playersKing.currentSquare : undefined,
    }));
  };

  const updatePlayerPieces = (updatedPieces: Piece[]) => {
    updatedPieces.forEach((updatedPiece) => {
      const playerPieces =
        gameState.piecesByPlayer.get(updatedPiece.player) || [];
      const updatedPlayerPieces = playerPieces.map((piece) =>
        piece.id === updatedPiece.id ? updatedPiece : piece
      );
      gameState.piecesByPlayer.set(updatedPiece.player, updatedPlayerPieces);
    });
  };

  return {
    ...gameState,
    setGameState,
    initializeBoard,
    getLegalMoves,
    executeMove,
    updatePlayerPieces,
  };
};
