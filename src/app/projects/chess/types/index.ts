import { useGameManager } from "../hooks/useGameManager";
import { useHighlighter } from "../hooks/useHighlighter";
import { usePieceSelector } from "../hooks/usePieceSelector";
import { usePromotionHandler } from "../hooks/usePromotionHandler";
import { useStockfishHandler } from "../hooks/useStockfishHandler";

export type Square = {
  row: number;
  col: number;
  piece?: Piece;
};

export type Piece = {
  id: string;
  player: Player;
  type: PieceType;
  color: PlayerColor;
  currentSquare: Square;
  movementStrategy: MovementStrategy;
  isAlive: boolean;
  hasMoved?: boolean;
};

export interface MovementStrategy {
  (
    board: Square[][],
    piece: Piece,
    isBoardFlipped: boolean,
    moveHistory: Move[]
  ): Move[];
}

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}

export type Player = {
  id: string;
  color: PlayerColor;
  type: PlayerType;
};

export enum PlayerColor {
  WHITE = "white",
  BLACK = "black",
}

export enum PlayerType {
  HUMAN = "Human",
  COMPUTER = "Computer",
}

export type PromotionPanelState = {
  promotionSquare: Square | undefined;
  promotionColor: PlayerColor | undefined;
  promotingPawn: Piece | undefined;
};

export enum MoveType {
  STNDRD = "Standard",
  CASTLE = "Castling",
  EP = "EnPassant",
  PROMO = "Promotion",
}

export type MoveHistory = {
  move: Move;
  wasBoardFlipped: boolean;
};

export interface Move {
  type: MoveType;
  from: Square;
  to: Square;
  piece: Piece;
  capturedPiece?: Piece;
  isPromotion?: boolean;
}

export type ChessEngineMove = {
  from: string;
  to: string;
  promotion?: string;
} | null;

export interface CastlingMove extends Move {
  rook: Piece;
  kingFrom: Square;
  kingTo: Square;
  rookFrom: Square;
  rookTo: Square;
}

export interface EnPassantMove extends Move {
  capturedPieceSquare: Square;
}

export interface PromotionMove extends Move {
  promotionType: PieceType;
}

export type ArrowProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isStockfish?: boolean;
};

export type CircleProps = {
  cx: number;
  cy: number;
};

export type Highlighter = ReturnType<typeof useHighlighter>;
export type GameManager = ReturnType<typeof useGameManager>;
export type PieceSelector = ReturnType<typeof usePieceSelector>;
export type PromotionHandler = ReturnType<typeof usePromotionHandler>;
export type StockfishHandler = ReturnType<typeof useStockfishHandler>;
