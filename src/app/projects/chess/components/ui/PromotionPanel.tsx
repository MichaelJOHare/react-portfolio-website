import { useEffect, useState } from "react";
import { PieceType, PlayerColor, Square } from "../../types";
import { useGame } from "../../context/GameContext";

type Positions = {
  left: string;
  leftLg: string;
};

export const PromotionPanel = () => {
  const { isBoardFlipped, promotionHandler } = useGame();
  const { promotionSquare, promotingColor, onPromotionSelect } =
    promotionHandler;
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 1024px) and (min-height: 900px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (min-height: 900px)"
    );
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

  const calculatePosition = (square: Square): Positions => {
    const smallScreenVmin = 90;
    const bigScreenVmin = 70;
    const squaresPerRow = 8;
    return {
      left: `${(smallScreenVmin / squaresPerRow) * square.col}vmin`,
      leftLg: `${(bigScreenVmin / squaresPerRow) * square.col}vmin`,
    };
  };

  const getTopOffset = (
    index: number,
    color: PlayerColor,
    isLargeScreen: boolean,
    isFlipped: boolean
  ): string => {
    //console.trace("calling", isBoardFlipped, color);
    const size = isLargeScreen ? 8.75 : 11;
    const offset = isLargeScreen ? 35 : 45;

    const whiteBase = index * size;
    const blackBase = offset + index * size;

    const showWhiteAtTop =
      (color === PlayerColor.WHITE && !isFlipped) ||
      (color === PlayerColor.BLACK && isFlipped);

    return `${showWhiteAtTop ? whiteBase : blackBase}vmin`;
  };

  const positions = calculatePosition(promotionSquare);
  const orderedPromotionPieces = isBoardFlipped
    ? promotionPieces.slice().reverse()
    : promotionPieces;

  return (
    <div className="absolute w-full h-full flex flex-col backdrop-filter backdrop-blur-xs z-20">
      {orderedPromotionPieces.map((type, index) => (
        <div
          key={type}
          className="absolute w-[11.25vmin] h-[11.25vmin] cursor-pointer lg:w-[8.75vmin] lg:h-[8.75vmin] limitedHeight:w-[11.25vmin] limitedHeight:h-[11.25vmin]"
          style={{
            top: getTopOffset(
              index,
              promotingColor,
              isLargeScreen,
              isBoardFlipped
            ),
            left: isLargeScreen ? positions.leftLg : positions.left,
          }}
          onClick={() => onPromotionSelect(type)}
        >
          <img
            src={`/assets/images/${promotingColor}-${type}.svg`}
            alt={`${promotingColor}-${type}`}
            className="w-full h-full hover:border-4 hover:border-green-700 select-none"
          />
        </div>
      ))}
    </div>
  );
};
