import { Move, PieceType, Player, PlayerColor, Square } from "../types";
import { getPieceAt } from "./board";
import { createSquare, squareToString } from "./square";

export const INITIAL_FEN = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`;

export function toFEN(
  board: Square[][],
  players: Player[],
  currentPlayerIndex: number,
  moveHistory: Move[],
  halfMoveClock: number,
  fullMoveNumber: number,
  isBoardFlipped: boolean
): string {
  let fen = "";

  const pieceToFENMap = {
    [PieceType.KING]: { [PlayerColor.WHITE]: "K", [PlayerColor.BLACK]: "k" },
    [PieceType.QUEEN]: { [PlayerColor.WHITE]: "Q", [PlayerColor.BLACK]: "q" },
    [PieceType.ROOK]: { [PlayerColor.WHITE]: "R", [PlayerColor.BLACK]: "r" },
    [PieceType.BISHOP]: { [PlayerColor.WHITE]: "B", [PlayerColor.BLACK]: "b" },
    [PieceType.KNIGHT]: { [PlayerColor.WHITE]: "N", [PlayerColor.BLACK]: "n" },
    [PieceType.PAWN]: { [PlayerColor.WHITE]: "P", [PlayerColor.BLACK]: "p" },
  };
  const epTarget = getEnPassantTarget(moveHistory, isBoardFlipped);

  // piece placement
  for (let fenRank = 0; fenRank < 8; fenRank++) {
    let emptySquares = 0;

    const boardRow = isBoardFlipped ? 7 - fenRank : fenRank;

    for (let fenFile = 0; fenFile < 8; fenFile++) {
      const boardCol = isBoardFlipped ? 7 - fenFile : fenFile;

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

  // append other FEN parts (simplified for brevity)
  fen +=
    " " + (players[currentPlayerIndex].color === PlayerColor.WHITE ? "w" : "b");
  fen += " " + generateCastlingAvailability(board);
  fen += " " + (epTarget !== null ? squareToString(epTarget) : "-");
  fen += " " + halfMoveClock;
  fen += " " + fullMoveNumber;

  return fen;
}

function generateCastlingAvailability(board: Square[][]) {
  let castlingAvailability = "";

  function checkSide(
    majorPieceRow: number,
    queenSideRookColumn: number,
    kingSideRookColumn: number,
    isWhite: boolean
  ) {
    const king = board[majorPieceRow][4].piece;
    if (king && king.type === PieceType.KING && !king.hasMoved) {
      const rookPositions = [kingSideRookColumn, queenSideRookColumn];
      for (const position of rookPositions) {
        const rook = board[majorPieceRow][position].piece;
        if (rook && rook.type === PieceType.ROOK && !rook.hasMoved) {
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
  }

  checkSide(7, 0, 7, true);

  checkSide(0, 0, 7, false);

  return castlingAvailability || "-";
}

function getEnPassantTarget(moveHistory: Move[], isBoardFlipped: boolean) {
  const move =
    moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : null;

  if (
    move &&
    move.piece.type === PieceType.PAWN &&
    Math.abs(move.from.row - move.to.row) === 2
  ) {
    let targetRow = (move.from.row + move.to.row) / 2;
    const targetCol = move.from.col;

    if (isBoardFlipped) {
      targetRow = 7 - targetRow;
    }

    return createSquare(targetRow, targetCol);
  }

  return null;
}
