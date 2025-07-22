import {
  Move,
  PieceType,
  Player,
  PlayerColor,
  Square,
  Piece,
  GameState,
  PieceColumn,
  PieceRow,
  NOT_MOVED,
} from "../types";
import {
  createPiece,
  getMovementStrategyFromType,
  havePiecesMoved,
} from "./piece";
import { getPieceAt, defaultBoard } from "./board";
import { createSquare, squareToString } from "./square";

export const INITIAL_FEN = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`;

export const toFEN = (
  board: Square[][],
  players: Player[],
  currentPlayerIndex: number,
  moveHistory: Move[],
  halfMoveClock: number,
  fullMoveNumber: number,
): string => {
  let fen = "";

  const pieceToFENMap = {
    [PieceType.KING]: {
      [PlayerColor.WHITE]: "K",
      [PlayerColor.BLACK]: "k",
    },
    [PieceType.QUEEN]: {
      [PlayerColor.WHITE]: "Q",
      [PlayerColor.BLACK]: "q",
    },
    [PieceType.ROOK]: {
      [PlayerColor.WHITE]: "R",
      [PlayerColor.BLACK]: "r",
    },
    [PieceType.BISHOP]: {
      [PlayerColor.WHITE]: "B",
      [PlayerColor.BLACK]: "b",
    },
    [PieceType.KNIGHT]: {
      [PlayerColor.WHITE]: "N",
      [PlayerColor.BLACK]: "n",
    },
    [PieceType.PAWN]: {
      [PlayerColor.WHITE]: "P",
      [PlayerColor.BLACK]: "p",
    },
  };
  const epTarget = getEnPassantTarget(moveHistory);

  for (let fenRank = 0; fenRank < 8; fenRank++) {
    let emptySquares = 0;

    const boardRow = fenRank;

    for (let fenFile = 0; fenFile < 8; fenFile++) {
      const boardCol = fenFile;

      const piece = getPieceAt(board, boardRow, boardCol);
      if (!piece) {
        emptySquares++;
      } else {
        if (emptySquares > 0) {
          fen += emptySquares;
          emptySquares = 0;
        }
        fen += pieceToFENMap[piece.type][piece.color];
      }
    }

    if (emptySquares > 0) {
      fen += emptySquares;
    }

    if (fenRank !== 7) fen += "/";
  }

  fen +=
    " " + (players[currentPlayerIndex].color === PlayerColor.WHITE ? "w" : "b");
  fen += " " + generateCastlingAvailability(board);
  fen += " " + (epTarget !== null ? squareToString(epTarget) : "-");
  fen += " " + halfMoveClock;
  fen += " " + fullMoveNumber;

  return fen;
};

const generateCastlingAvailability = (board: Square[][]) => {
  let castlingAvailability = "";

  const checkSide = (
    majorPieceRow: number,
    queenSideRookColumn: number,
    kingSideRookColumn: number,
    isWhite: boolean,
  ) => {
    const king = board[majorPieceRow][PieceColumn.KING].piece;
    if (king && king.type === PieceType.KING && !havePiecesMoved([king])) {
      const rookPositions = [kingSideRookColumn, queenSideRookColumn];
      for (const position of rookPositions) {
        const rook = board[majorPieceRow][position].piece;
        if (rook && rook.type === PieceType.ROOK && !havePiecesMoved([rook])) {
          castlingAvailability += isWhite
            ? position === kingSideRookColumn
              ? "K"
              : "Q"
            : position === kingSideRookColumn
              ? "k"
              : "q";
        }
      }
    }
  };

  checkSide(PieceRow.W_MAJOR, PieceColumn.Q_ROOK, PieceColumn.K_ROOK, true);

  checkSide(PieceRow.B_MAJOR, PieceColumn.Q_ROOK, PieceColumn.K_ROOK, false);

  return castlingAvailability || "-";
};

// at some poinnt, implement en passant target square for stockfish
// really only matters for the initial state after pasting FEN - afterwards it gets updated in toFEN
export const fromFEN = (
  fen: string,
  whitePlayer: Player,
  blackPlayer: Player,
  currentGameState?: GameState,
): {
  board: Square[][];
  piecesByPlayer: Map<string, Piece[]>;
  currentPlayerIndex: number;
  halfMoveClock: number;
  fullMoveNumber: number;
  isValid: boolean;
} => {
  const clearedState = {
    board: defaultBoard(),
    piecesByPlayer: new Map<string, Piece[]>(),
    currentPlayerIndex: 0,
    halfMoveClock: 0,
    fullMoveNumber: 1,
    isValid: false,
  };
  const fenParts = fen.trim().split(" ");

  if (fenParts.length !== 6) {
    return currentGameState
      ? { ...currentGameState, isValid: false }
      : clearedState;
  }

  const [piecePlacement, activeColor, castling, enPassant, halfMove, fullMove] =
    fenParts;

  /*  FEN STRUCTURE VALIDATION */
  if (
    !piecePlacement ||
    !activeColor ||
    !castling ||
    !enPassant ||
    !halfMove ||
    !fullMove
  ) {
    return currentGameState
      ? { ...currentGameState, isValid: false }
      : clearedState;
  }

  if (activeColor !== "w" && activeColor !== "b") {
    return currentGameState
      ? { ...currentGameState, isValid: false }
      : clearedState;
  }

  const ranks = piecePlacement.split("/");
  if (ranks.length !== 8) {
    return currentGameState
      ? { ...currentGameState, isValid: false }
      : clearedState;
  }

  for (const rank of ranks) {
    if (!rank || !/^[KQRBNPkqrbnp1-8]+$/.test(rank)) {
      return currentGameState
        ? { ...currentGameState, isValid: false }
        : clearedState;
    }

    let squareCount = 0;
    for (const char of rank) {
      if (/\d/.test(char)) {
        squareCount += parseInt(char);
      } else {
        squareCount += 1;
      }
    }
    if (squareCount !== 8) {
      return currentGameState
        ? { ...currentGameState, isValid: false }
        : clearedState;
    }
  }
  /*  FEN STRUCTURE VALIDATION */

  const board = defaultBoard();
  const piecesByPlayer = new Map<string, Piece[]>();
  const whitePlayerPieces: Piece[] = [];
  const blackPlayerPieces: Piece[] = [];

  const fenToPieceType: Record<string, PieceType> = {
    k: PieceType.KING,
    K: PieceType.KING,
    q: PieceType.QUEEN,
    Q: PieceType.QUEEN,
    r: PieceType.ROOK,
    R: PieceType.ROOK,
    b: PieceType.BISHOP,
    B: PieceType.BISHOP,
    n: PieceType.KNIGHT,
    N: PieceType.KNIGHT,
    p: PieceType.PAWN,
    P: PieceType.PAWN,
  };

  try {
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      const rank = ranks[rankIndex];
      let fileIndex = 0;

      for (const char of rank) {
        if (/\d/.test(char)) {
          fileIndex += parseInt(char);
        } else if (fenToPieceType[char]) {
          const pieceType = fenToPieceType[char];
          const color =
            char === char.toUpperCase() ? PlayerColor.WHITE : PlayerColor.BLACK;
          const player =
            color === PlayerColor.WHITE ? whitePlayer : blackPlayer;
          const square = board[rankIndex][fileIndex];

          const HAS_MOVED = -2;
          let firstMoveNumber: number = NOT_MOVED;
          if (pieceType === PieceType.KING || pieceType === PieceType.ROOK) {
            if (pieceType === PieceType.KING) {
              const kingSide = color === PlayerColor.WHITE ? "K" : "k";
              const queenSide = color === PlayerColor.WHITE ? "Q" : "q";
              const hasCastlingRights =
                castling.includes(kingSide) || castling.includes(queenSide);
              firstMoveNumber = hasCastlingRights ? NOT_MOVED : 1;
            } else if (pieceType === PieceType.ROOK) {
              if (color === PlayerColor.WHITE) {
                if (fileIndex === 0)
                  firstMoveNumber = castling.includes("Q")
                    ? NOT_MOVED
                    : HAS_MOVED;
                if (fileIndex === 7)
                  firstMoveNumber = castling.includes("K")
                    ? NOT_MOVED
                    : HAS_MOVED;
              } else {
                if (fileIndex === 0)
                  firstMoveNumber = castling.includes("q")
                    ? NOT_MOVED
                    : HAS_MOVED;
                if (fileIndex === 7)
                  firstMoveNumber = castling.includes("k")
                    ? NOT_MOVED
                    : HAS_MOVED;
              }
            }
          }

          const movementStrategy = getMovementStrategyFromType(pieceType);
          if (!movementStrategy) {
            return currentGameState
              ? { ...currentGameState, isValid: false }
              : clearedState;
          }

          const piece = createPiece(
            player,
            pieceType,
            color,
            square,
            movementStrategy,
            true,
            firstMoveNumber,
          );

          board[rankIndex][fileIndex].piece = piece;

          if (color === PlayerColor.WHITE) {
            whitePlayerPieces.push(piece);
          } else {
            blackPlayerPieces.push(piece);
          }

          fileIndex++;
        }
      }
    }
  } catch {
    return currentGameState
      ? { ...currentGameState, isValid: false }
      : clearedState;
  }

  piecesByPlayer.set(whitePlayer.id, whitePlayerPieces);
  piecesByPlayer.set(blackPlayer.id, blackPlayerPieces);

  const currentPlayerIndex = activeColor === "w" ? 0 : 1;
  const halfMoveClock = parseInt(halfMove) || 0;
  const fullMoveNumber = parseInt(fullMove) || 1;

  return {
    board,
    piecesByPlayer,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
    isValid: true,
  };
};

const getEnPassantTarget = (moveHistory: Move[]) => {
  const move =
    moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : null;

  if (
    move &&
    move.piece.type === PieceType.PAWN &&
    Math.abs(move.from.row - move.to.row) === 2
  ) {
    const targetRow = (move.from.row + move.to.row) / 2;
    const targetCol = move.from.col;

    return createSquare(targetRow, targetCol);
  }

  return null;
};
