import {
  createCastlingMove,
  createPromotionMove,
  createStandardMove,
  executeMoveByType,
  executePromoMove,
  isValidCastlingMove,
  undoMoveByType,
  undoPromoMove,
} from "@/app/projects/chess/utils/move";
import {
  defaultBoard,
  createSquare,
  getMovementStrategyFromType,
} from "@/app/projects/chess/utils";
import {
  Move,
  MovementStrategy,
  Piece,
  PieceType,
  Player,
  PlayerColor,
  PlayerType,
  Square,
  NOT_MOVED,
  PIECE_MOVE_MULTIPLIER,
} from "@/app/projects/chess/types";

const mockMovementStrategy: MovementStrategy = () => [];

const createMockPlayer = (color: PlayerColor): Player => ({
  id: `${color}-player`,
  color,
  type: PlayerType.HUMAN,
});

const createMockPiece = (overrides: Partial<Piece> = {}): Piece => {
  const player =
    overrides.player ?? createMockPlayer(overrides.color ?? PlayerColor.WHITE);
  const color = overrides.color ?? player.color;
  const square = overrides.currentSquare ?? createSquare(0, 0);

  return {
    id:
      overrides.id ??
      `${color}-${overrides.type ?? PieceType.PAWN}-${square.row}-${square.col}`,
    player,
    type: overrides.type ?? PieceType.PAWN,
    color,
    currentSquare: square,
    movementStrategy: overrides.movementStrategy ?? mockMovementStrategy,
    isAlive: overrides.isAlive ?? true,
    firstMoveNumber: overrides.firstMoveNumber ?? NOT_MOVED,
    wasPromoted: overrides.wasPromoted,
  };
};

const placePiece = (board: Square[][], piece: Piece) => {
  board[piece.currentSquare.row][piece.currentSquare.col].piece = piece;
};

const createEmptyCapturedList = (piece: Piece) => [
  { ...piece, isAlive: false },
];

describe("move utilities", () => {
  describe("executeMoveByType", () => {
    it("moves a pawn, captures an opponent, and resets clocks", () => {
      const board = defaultBoard();
      const from = board[6][0];
      const to = board[5][0];
      const whitePlayer = createMockPlayer(PlayerColor.WHITE);
      const blackPlayer = createMockPlayer(PlayerColor.BLACK);
      const pawn = createMockPiece({
        player: whitePlayer,
        color: PlayerColor.WHITE,
        type: PieceType.PAWN,
        currentSquare: from,
      });
      const target = createMockPiece({
        player: blackPlayer,
        color: PlayerColor.BLACK,
        type: PieceType.KNIGHT,
        currentSquare: to,
      });

      placePiece(board, pawn);
      placePiece(board, target);

      const move = createStandardMove(pawn, from, to, target);
      const result = executeMoveByType(move, board, 3, 10);

      expect(board[6][0].piece).toBeUndefined();
      expect(board[5][0].piece?.id).toBe(pawn.id);
      expect(board[5][0].piece?.currentSquare).toEqual(to);
      expect(board[5][0].piece?.firstMoveNumber).toBe(
        10 * PIECE_MOVE_MULTIPLIER,
      );
      expect(result.updatedPieces).toHaveLength(2);
      expect(result.capturedPieces).toHaveLength(1);
      expect(result.capturedPieces[0].isAlive).toBe(false);
      expect(result.newHalfMoveClock).toBe(0);
      expect(result.newFullMoveNumber).toBe(10);
    });
  });

  describe("undoMoveByType", () => {
    it("restores a captured move and resurrects the captured piece", () => {
      const board = defaultBoard();
      const from = board[6][0];
      const to = board[5][0];
      const whitePlayer = createMockPlayer(PlayerColor.WHITE);
      const blackPlayer = createMockPlayer(PlayerColor.BLACK);

      const captured = createMockPiece({
        player: blackPlayer,
        color: PlayerColor.BLACK,
        type: PieceType.BISHOP,
        currentSquare: to,
      });

      const movedPawn = createMockPiece({
        player: whitePlayer,
        color: PlayerColor.WHITE,
        type: PieceType.PAWN,
        currentSquare: to,
        firstMoveNumber: 10 * PIECE_MOVE_MULTIPLIER,
      });

      placePiece(board, movedPawn);

      const move = createStandardMove(movedPawn, from, to, captured);
      const capturedPieces = createEmptyCapturedList(captured);

      const result = undoMoveByType(move, board, capturedPieces, 0, 10);

      expect(board[6][0].piece?.id).toBe(movedPawn.id);
      expect(board[6][0].piece?.currentSquare).toEqual(from);
      expect(board[5][0].piece?.id).toBe(captured.id);
      expect(board[5][0].piece?.isAlive).toBe(true);
      expect(result.capturedPieces).toHaveLength(0);
      expect(result.updatedPieces).toHaveLength(2);
      expect(result.newHalfMoveClock).toBe(0);
      expect(result.newFullMoveNumber).toBe(10);
    });
  });

  describe("promotion moves", () => {
    it("promotes a pawn and applies the correct movement strategy", () => {
      const board = defaultBoard();
      const from = board[1][0];
      const to = board[0][0];
      const whitePlayer = createMockPlayer(PlayerColor.WHITE);
      const pawn = createMockPiece({
        player: whitePlayer,
        color: PlayerColor.WHITE,
        type: PieceType.PAWN,
        currentSquare: from,
      });
      const target = createMockPiece({
        player: createMockPlayer(PlayerColor.BLACK),
        color: PlayerColor.BLACK,
        type: PieceType.ROOK,
        currentSquare: to,
      });

      placePiece(board, pawn);
      placePiece(board, target);

      const move = createPromotionMove(
        pawn,
        from,
        to,
        PieceType.QUEEN,
        true,
        target,
      );

      const updatedPieces = executePromoMove(move, board, target);
      const promotedPiece = board[0][0].piece;

      expect(promotedPiece?.type).toBe(PieceType.QUEEN);
      expect(promotedPiece?.movementStrategy).toBe(
        getMovementStrategyFromType(PieceType.QUEEN),
      );
      expect(promotedPiece?.wasPromoted).toBe(true);
      expect(board[1][0].piece).toBeUndefined();
      expect(updatedPieces).toHaveLength(2);
    });

    it("undoes a promotion and revives the captured piece", () => {
      const board = defaultBoard();
      const from = board[1][0];
      const to = board[0][0];
      const pawn = createMockPiece({
        player: createMockPlayer(PlayerColor.WHITE),
        color: PlayerColor.WHITE,
        type: PieceType.PAWN,
        currentSquare: from,
      });
      const target = createMockPiece({
        player: createMockPlayer(PlayerColor.BLACK),
        color: PlayerColor.BLACK,
        type: PieceType.ROOK,
        currentSquare: to,
      });

      placePiece(board, pawn);
      placePiece(board, target);

      const move = createPromotionMove(
        pawn,
        from,
        to,
        PieceType.QUEEN,
        true,
        target,
      );

      const promoResult = executePromoMove(move, board, target);

      expect(promoResult).toHaveLength(2);

      const undoResult = undoPromoMove(move, board, target);
      const restoredPawn = board[1][0].piece;
      const revivedPiece = board[0][0].piece;

      expect(restoredPawn?.type).toBe(PieceType.PAWN);
      expect(restoredPawn?.wasPromoted).toBe(false);
      expect(revivedPiece?.id).toBe(target.id);
      expect(revivedPiece?.isAlive).toBe(true);
      expect(undoResult).toHaveLength(2);
    });
  });

  describe("isValidCastlingMove", () => {
    const setupCastle = () => {
      const board = defaultBoard();
      const kingFrom = board[7][4];
      const rookFrom = board[7][7];
      const king = createMockPiece({
        player: createMockPlayer(PlayerColor.WHITE),
        color: PlayerColor.WHITE,
        type: PieceType.KING,
        currentSquare: kingFrom,
      });
      const rook = createMockPiece({
        player: king.player,
        color: PlayerColor.WHITE,
        type: PieceType.ROOK,
        currentSquare: rookFrom,
      });

      placePiece(board, king);
      placePiece(board, rook);

      const move = createCastlingMove(
        king,
        rook,
        kingFrom,
        board[7][6],
        rookFrom,
        board[7][5],
      );

      return { board, move };
    };

    it("returns true when path is clear and not attacked", () => {
      const { board, move } = setupCastle();
      const result = isValidCastlingMove(move, [], board);
      expect(result).toBe(true);
    });

    it("returns false when an intermediate square is attacked", () => {
      const { board, move } = setupCastle();
      const attackingMove: Move = createStandardMove(
        createMockPiece({
          player: createMockPlayer(PlayerColor.BLACK),
          color: PlayerColor.BLACK,
          type: PieceType.ROOK,
          currentSquare: createSquare(0, 6),
        }),
        createSquare(0, 6),
        createSquare(7, 6),
      );

      const result = isValidCastlingMove(move, [attackingMove], board);
      expect(result).toBe(false);
    });

    it("returns false when the path is occupied", () => {
      const { board, move } = setupCastle();
      const blocker = createMockPiece({
        player: createMockPlayer(PlayerColor.WHITE),
        color: PlayerColor.WHITE,
        type: PieceType.BISHOP,
        currentSquare: board[7][5],
      });

      placePiece(board, blocker);
      const result = isValidCastlingMove(move, [], board);
      expect(result).toBe(false);
    });
  });
});
