import { useGameManager } from "../hooks/useGameManager";
import { useHighlighter } from "../hooks/useHighlighter";
import { usePieceAnimator } from "../hooks/usePieceAnimator";
import { usePieceSelector } from "../hooks/usePieceSelector";
import { usePromotionHandler } from "../hooks/usePromotionHandler";
import { useStockfishHandler } from "../hooks/useStockfishHandler";

export type GameState = {
  board: Square[][];
  players: Player[];
  piecesByPlayer: Map<string, Piece[]>;
  currentPlayerIndex: number;
  capturedPieces: Piece[];
  kingSquare: Square | undefined;
  isKingInCheck: boolean;
  moveHistory: MoveHistory[];
  undoneMoveHistory: MoveHistory[];
  halfMoveClock: number;
  fullMoveNumber: number;
};

export type Square = {
  row: number;
  col: number;
  piece?: Piece;
};

export const NOT_MOVED = -1;
export type Piece = {
  id: string;
  player: Player;
  type: PieceType;
  color: PlayerColor;
  currentSquare: Square;
  movementStrategy: MovementStrategy;
  isAlive: boolean;
  firstMoveNumber: number;
  wasPromoted?: boolean;
};

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}

export enum PieceColumn {
  Q_ROOK = 0,
  K_ROOK = 7,
  Q_KNIGHT = 1,
  K_KNIGHT = 6,
  Q_BISHOP = 2,
  K_BISHOP = 5,
  QUEEN = 3,
  KING = 4,
}

export enum PieceRow {
  W_MAJOR = 7,
  W_MINOR = 6,
  B_MAJOR = 0,
  B_MINOR = 1,
}

export interface MovementStrategy {
  (board: Square[][], piece: Piece, moveHistory: Move[]): Move[];
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

export interface Move {
  type: MoveType;
  from: Square;
  to: Square;
  piece: Piece;
  capturedPiece?: Piece;
  isPromotion?: boolean;
}

export enum MoveType {
  STNDRD = "Standard",
  CASTLE = "Castling",
  EP = "EnPassant",
  PROMO = "Promotion",
}

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

export type MoveHistory = {
  move: Move;
  causedCheck: boolean;
  causedCheckMate: boolean;
};

export type PromotionPanel = {
  promotionSquare: Square | undefined;
  promotionColor: PlayerColor | undefined;
  promotingPawn: Piece | undefined;
};

export enum StockfishVersion {
  SF16 = "sf-16",
  SF17 = "sf-17",
}

export type EngineOptions = {
  colorChoice: number;
  strengthChoice: number;
};
export const DEFAULT_DEPTH = 28;
export const MAX_STRENGTH = 20;
export const NO_CHOICE = -1;
export const ColorChoice = {
  WHITE: 0,
  RANDOM: 1,
  BLACK: 2,
};

export type ChessEngineMove = {
  from: string;
  to: string;
  promotion?: string;
} | null;

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
export type PieceAnimator = ReturnType<typeof usePieceAnimator>;
export type PieceSelector = ReturnType<typeof usePieceSelector>;
export type PromotionHandler = ReturnType<typeof usePromotionHandler>;
export type StockfishHandler = ReturnType<typeof useStockfishHandler>;
