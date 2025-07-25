import {
  createPiece,
  getMovementStrategyFromType,
  havePiecesMoved,
  createSquare,
  squareToString,
  getPieceAt,
  defaultBoard,
} from ".";
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

export const INITIAL_FEN = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`;
const PIECE_TO_FEN_MAP = {
  [PieceType.KING]: { [PlayerColor.WHITE]: "K", [PlayerColor.BLACK]: "k" },
  [PieceType.QUEEN]: { [PlayerColor.WHITE]: "Q", [PlayerColor.BLACK]: "q" },
  [PieceType.ROOK]: { [PlayerColor.WHITE]: "R", [PlayerColor.BLACK]: "r" },
  [PieceType.BISHOP]: { [PlayerColor.WHITE]: "B", [PlayerColor.BLACK]: "b" },
  [PieceType.KNIGHT]: { [PlayerColor.WHITE]: "N", [PlayerColor.BLACK]: "n" },
  [PieceType.PAWN]: { [PlayerColor.WHITE]: "P", [PlayerColor.BLACK]: "p" },
};
const FEN_TO_PIECE_MAP = Object.entries(PIECE_TO_FEN_MAP).reduce(
  (acc, [pieceType, colorMap]) => {
    Object.entries(colorMap).forEach(([, fenChar]) => {
      acc[fenChar] = pieceType as PieceType;
    });
    return acc;
  },
  {} as Record<string, PieceType>,
);

export const toFEN = (
  board: Square[][],
  players: Player[],
  currentPlayerIndex: number,
  moveHistory: Move[],
  halfMoveClock: number,
  fullMoveNumber: number,
): string => {
  let fen = "";
  const epTarget = getEnPassantTarget(moveHistory);

  for (let fenRank = 0; fenRank < 8; fenRank++) {
    let emptySquares = 0;

    for (let fenFile = 0; fenFile < 8; fenFile++) {
      const piece = getPieceAt(board, fenRank, fenFile);
      if (!piece) {
        emptySquares++;
      } else {
        if (emptySquares > 0) {
          fen += emptySquares;
          emptySquares = 0;
        }
        fen += PIECE_TO_FEN_MAP[piece.type][piece.color];
      }
    }

    if (emptySquares > 0) {
      fen += emptySquares;
    }

    if (fenRank !== 7) fen += "/";
  }

  fen +=
    " " + (players[currentPlayerIndex].color === PlayerColor.WHITE ? "w" : "b");
  fen += " " + getCastlingRights(board);
  fen += " " + (epTarget !== null ? squareToString(epTarget) : "-");
  fen += " " + halfMoveClock;
  fen += " " + fullMoveNumber;

  return fen;
};

// .... just pass it in, it will be updated in toFEN
// at some point, implement en passant target square for stockfish
// really only matters for the initial state after pasting FEN - afterwards it gets updated in toFEN
export const fromFEN = (
  fen: string,
  whitePlayer: Player,
  blackPlayer: Player,
  currentGameState: GameState,
): {
  board: Square[][];
  piecesByPlayer: Map<string, Piece[]>;
  currentPlayerIndex: number;
  halfMoveClock: number;
  fullMoveNumber: number;
  isValid: boolean;
} => {
  const fenParts = fen.trim().split(" ");

  if (fenParts.length !== 6) return { ...currentGameState, isValid: false };

  const [piecePlacement, activeColor, castling, enPassant, halfMove, fullMove] =
    fenParts;

  if (
    !piecePlacement ||
    !activeColor ||
    !castling ||
    !enPassant ||
    !halfMove ||
    !fullMove
  ) {
    return { ...currentGameState, isValid: false };
  }

  if (activeColor !== "w" && activeColor !== "b") {
    return { ...currentGameState, isValid: false };
  }

  const ranks = piecePlacement.split("/");
  if (ranks.length !== 8) return { ...currentGameState, isValid: false };

  for (const rank of ranks) {
    if (!rank || !/^[KQRBNPkqrbnp1-8]+$/.test(rank)) {
      return { ...currentGameState, isValid: false };
    }

    let squareCount = 0;
    for (const char of rank) {
      squareCount += /\d/.test(char) ? parseInt(char) : 1;
    }
    if (squareCount !== 8) return { ...currentGameState, isValid: false };
  }

  const board = defaultBoard();
  const piecesByPlayer = new Map<string, Piece[]>();
  const whitePlayerPieces: Piece[] = [];
  const blackPlayerPieces: Piece[] = [];

  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    const rank = ranks[rankIndex];
    let fileIndex = 0;

    for (const char of rank) {
      if (/\d/.test(char)) {
        fileIndex += parseInt(char);
      } else if (FEN_TO_PIECE_MAP[char]) {
        const pieceType = FEN_TO_PIECE_MAP[char];
        const color = getColorFromFenChar(char);
        const player = color === PlayerColor.WHITE ? whitePlayer : blackPlayer;
        const square = board[rankIndex][fileIndex];

        const firstMoveNumber = getCastlingMoveNumber(
          pieceType,
          color,
          fileIndex,
          castling,
        );

        const movementStrategy = getMovementStrategyFromType(pieceType);
        if (!movementStrategy) return { ...currentGameState, isValid: false };

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

const getColorFromFenChar = (char: string): PlayerColor =>
  char === char.toUpperCase() ? PlayerColor.WHITE : PlayerColor.BLACK;

const getCastlingRights = (board: Square[][]) => {
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

const getCastlingMoveNumber = (
  pieceType: PieceType,
  color: PlayerColor,
  fileIndex: number,
  castling: string,
): number => {
  const HAS_MOVED = -2;

  if (pieceType === PieceType.KING) {
    const kingSide = color === PlayerColor.WHITE ? "K" : "k";
    const queenSide = color === PlayerColor.WHITE ? "Q" : "q";
    const hasCastlingRights =
      castling.includes(kingSide) || castling.includes(queenSide);
    return hasCastlingRights ? NOT_MOVED : 1;
  }

  if (pieceType === PieceType.ROOK) {
    const isWhite = color === PlayerColor.WHITE;
    const [queenSideChar, kingSideChar] = isWhite ? ["Q", "K"] : ["q", "k"];

    if (fileIndex === 0)
      return castling.includes(queenSideChar) ? NOT_MOVED : HAS_MOVED;
    if (fileIndex === 7)
      return castling.includes(kingSideChar) ? NOT_MOVED : HAS_MOVED;
  }

  return NOT_MOVED;
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
