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

  const promotionPieces: PieceType[] =
    promotingColor === PlayerColor.WHITE
      ? [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT]
      : [PieceType.KNIGHT, PieceType.BISHOP, PieceType.ROOK, PieceType.QUEEN];

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
    const isPlayerOnTop =
      (color === PlayerColor.BLACK && isBoardFlipped) ||
      (color === PlayerColor.WHITE && !isBoardFlipped);
    const size = isLargeScreen ? 8.75 : 11;
    const offset = isLargeScreen ? 35 : 45;
    return `${isPlayerOnTop ? index * size : offset + index * size}vmin`;
  };

  const orderedPromotionPieces = isBoardFlipped
    ? promotionPieces.slice().reverse()
    : promotionPieces;

  return (
    <div
      className="absolute z-20 flex h-full w-full flex-col backdrop-blur-xs
        backdrop-filter"
    >
      {orderedPromotionPieces.map((type, index) => (
        <div
          key={type}
          className="desktop-md:w-[8.75vmin] desktop-md:h-[8.75vmin]
            limitedHeight:w-[11.25vmin] limitedHeight:h-[11.25vmin] absolute
            h-[11.25vmin] w-[11.25vmin] cursor-pointer"
          style={{
            top: getTopOffset(index, promotingColor, isLargeScreen),
            left: calculatePosition(promotionSquare, isLargeScreen),
          }}
          onClick={() => onPromotionSelect(type)}
        >
          <img
            src={`/assets/images/${promotingColor}-${type}.svg`}
            alt={`${promotingColor}-${type}`}
            className="h-full w-full select-none hover:border-4
              hover:border-green-700"
          />
        </div>
      ))}
    </div>
  );
};
