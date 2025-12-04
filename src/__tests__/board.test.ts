import { renderHook, act } from "@testing-library/react";
import { useGameManager } from "@/app/projects/chess/hooks/useGameManager";
import { AnimatingPiece } from "@/app/projects/chess/hooks/usePieceAnimator";
import { INITIAL_FEN } from "@/app/projects/chess/utils/FEN";
import {
  Square,
  PieceAnimator,
  PieceType,
  PlayerColor,
} from "@/app/projects/chess/types";

const mockAnimator: PieceAnimator = {
  startAnimation: jest.fn(),
  getAnimatingPiece: jest.fn(),
  completeAnimation: jest.fn(),
  animatingPieces: new Map<string, AnimatingPiece>(),
};

const square = (row: number, col: number): Square => ({ row, col });

const renderGameManager = () => renderHook(() => useGameManager(mockAnimator));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useGameManager", () => {
  it("updates state when executing a legal move", () => {
    const { result } = renderGameManager();

    act(() => {
      result.current.initializeBoard();
    });

    const moves = result.current.getLegalMoves();
    const move = moves.find((m) => m.from.row === 6 && m.from.col === 0)!;

    act(() => {
      result.current.executeMove(
        square(move.from.row, move.from.col),
        square(move.to.row, move.to.col),
        moves,
      );
    });

    expect(result.current.board[move.to.row][move.to.col].piece?.id).toBe(
      move.piece.id,
    );
  });

  it("initializes the board with all major pieces", () => {
    const { result } = renderGameManager();

    act(() => {
      result.current.initializeBoard();
    });

    const whitePieces = result.current.piecesByPlayer.get(
      result.current.players[0].id,
    );
    const blackPieces = result.current.piecesByPlayer.get(
      result.current.players[1].id,
    );

    expect(whitePieces?.length).toBe(16);
    expect(blackPieces?.length).toBe(16);
    expect(result.current.board[7][4].piece?.type).toBe(PieceType.KING);
    expect(result.current.board[0][4].piece?.type).toBe(PieceType.KING);
  });

  it("returns only moves for the current player", () => {
    const { result } = renderGameManager();

    act(() => {
      result.current.initializeBoard();
    });

    const moves = result.current.getLegalMoves();
    const currentPlayerColor =
      result.current.players[result.current.currentPlayerIndex].color;

    expect(moves.length).toBeGreaterThan(0);
    expect(moves.every((move) => move.piece.color === currentPlayerColor)).toBe(
      true,
    );
  });

  it("reverts the most recent move when replayMoves is called with undo", () => {
    const { result } = renderGameManager();

    act(() => {
      result.current.initializeBoard();
    });

    const moves = result.current.getLegalMoves();
    const move = moves.find((m) => m.from.row === 6 && m.from.col === 0)!;

    act(() => {
      result.current.executeMove(
        square(move.from.row, move.from.col),
        square(move.to.row, move.to.col),
        moves,
      );
    });

    act(() => {
      result.current.replayMoves(1, true);
    });

    expect(result.current.board[move.from.row][move.from.col].piece?.id).toBe(
      move.piece.id,
    );
    expect(
      result.current.board[move.to.row][move.to.col].piece,
    ).toBeUndefined();
    expect(result.current.moveHistory).toHaveLength(0);
  });

  it("loads a valid FEN string and resets histories", () => {
    const { result } = renderGameManager();

    act(() => {
      result.current.initializeBoard();
    });

    const moves = result.current.getLegalMoves();
    const move = moves.find((m) => m.from.row === 6 && m.from.col === 1)!;

    act(() => {
      result.current.executeMove(
        square(move.from.row, move.from.col),
        square(move.to.row, move.to.col),
        moves,
      );
    });

    let loaded = false;

    act(() => {
      loaded = result.current.loadFromFEN(INITIAL_FEN);
    });

    expect(loaded).toBe(true);
    expect(result.current.moveHistory).toHaveLength(0);
    expect(result.current.undoneMoveHistory).toHaveLength(0);
    expect(result.current.capturedPieces).toHaveLength(0);
    expect(result.current.currentPlayerIndex).toBe(0);
    expect(result.current.board[0][0].piece?.color).toBe(PlayerColor.BLACK);
    expect(result.current.board[7][0].piece?.color).toBe(PlayerColor.WHITE);
  });

  it("rejects invalid FEN strings", () => {
    const { result } = renderGameManager();

    let loaded = true;

    act(() => {
      loaded = result.current.loadFromFEN("not-a-fen");
    });

    expect(loaded).toBe(false);
  });
});
