import { useEffect, useState } from "react";
import { PieceType, PlayerColor, Square } from "../../types";
import { useGame } from "../../context/GameContext";

export const PromotionPanel = () => {
  const { isBoardFlipped, promotionHandler } = useGame();
  const { promotionSquare, promotingColor, onPromotionSelect } =
    promotionHandler;
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (min-height: 900px)",
    );
    setIsLargeScreen(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) =>
      setIsLargeScreen(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!promotionSquare || !promotingColor) return null;

  let promotionPieces = [
    PieceType.QUEEN,
    PieceType.ROOK,
    PieceType.BISHOP,
    PieceType.KNIGHT,
  ];
  if (promotingColor === PlayerColor.BLACK) {
    promotionPieces = [...promotionPieces].reverse();
  }

  const calculatePosition = (
    square: Square,
    isLargeScreen: boolean,
  ): string => {
    const col = square.col;
    const squareSize = isLargeScreen ? 70 : 90;
    const squaresPerRow = 8;

    return `${(squareSize / squaresPerRow) * col}vmin`;
  };

  const getTopOffset = (
    index: number,
    color: PlayerColor,
    isLargeScreen: boolean,
  ): string => {
    const isPlayerOnTop = color === PlayerColor.WHITE;

    const squareSize = isLargeScreen ? 8.75 : 11;
    const topOfPromotionSquare = promotionSquare.row * squareSize;

    const offset = isPlayerOnTop
      ? topOfPromotionSquare + index * squareSize
      : topOfPromotionSquare - (3 - index) * squareSize;

    return `${offset}vmin`;
  };

  return (
    <div className="absolute z-20 flex h-full w-full flex-col backdrop-blur-xs backdrop-filter">
      {promotionPieces.map((type, index) => (
        <div
          key={type}
          className="desktop-md:w-[8.75vmin] desktop-md:h-[8.75vmin] limitedHeight:w-[11.25vmin] limitedHeight:h-[11.25vmin] absolute h-[11.25vmin] w-[11.25vmin] cursor-pointer from-amber-400 to-amber-700 hover:bg-radial"
          style={{
            top: getTopOffset(index, promotingColor, isLargeScreen),
            left: calculatePosition(promotionSquare, isLargeScreen),
          }}
          onClick={() => onPromotionSelect(type)}
        >
          <img
            src={`/assets/images/${promotingColor}-${type}.svg`}
            alt={`${promotingColor}-${type}`}
            className={`h-full w-full select-none hover:scale-116 ${isBoardFlipped ? "rotate-180" : ""}`}
          />
        </div>
      ))}
    </div>
  );
};
