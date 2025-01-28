import React from "react";
import { useState, useEffect } from "react";
import { Piece, PieceType, PlayerColor, Square } from "../../types";

type PromotionPanelProps = {
  isBoardFlipped: boolean;
  square?: Square;
  promotingPawn?: Piece;
  color?: PlayerColor;
  onPromotionSelect: (
    type: PieceType,
    square?: Square,
    promotingPawn?: Piece
  ) => void;
};

type Positions = {
  top: string;
  left: string;
  topLg: string;
  leftLg: string;
};

export const PromotionPanel = ({
  isBoardFlipped,
  square,
  promotingPawn,
  color,
  onPromotionSelect,
}: PromotionPanelProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) =>
      setIsLargeScreen(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!square || !color) return null;

  const promotionPieces: PieceType[] =
    color === PlayerColor.WHITE
      ? [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT]
      : [PieceType.KNIGHT, PieceType.BISHOP, PieceType.ROOK, PieceType.QUEEN];

  const calculatePosition = (square: Square, color: PlayerColor): Positions => {
    return {
      top: color === PlayerColor.WHITE ? "0vmin" : "90vmin",
      left: `${(90 / 8) * square.col}vmin`,
      topLg: color === PlayerColor.WHITE ? "0vmin" : "70vmin",
      leftLg: `${(70 / 8) * square.col}vmin`,
    };
  };

  const positions = calculatePosition(square, color);

  return (
    <div className="absolute w-full h-full flex flex-col backdrop-filter backdrop-blur-sm z-20">
      {promotionPieces.map((type, index) => (
        <div
          key={type}
          className="absolute w-[11.25vmin] h-[11.25vmin] cursor-pointer lg:w-[8.75vmin] lg:h-[8.75vmin]"
          style={{
            top: `${
              color === PlayerColor.WHITE
                ? isLargeScreen
                  ? index * 8.75
                  : index * 11
                : isLargeScreen
                ? 35 + index * 8.75
                : 45 + index * 11
            }vmin`,
            left: isLargeScreen ? positions.leftLg : positions.left,
          }}
          onClick={() => onPromotionSelect(type, square, promotingPawn)}
        >
          <img
            src={`/assets/images/${color}-${type}.svg`}
            alt={`${color}-${type}`}
            className="w-full h-full hover:border-4 hover:border-green-700 select-none"
          />
        </div>
      ))}
    </div>
  );
};
