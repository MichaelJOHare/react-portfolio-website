import { PieceType, PlayerColor, Square } from "../../types";
import { useGame } from "../../context/GameContext";

export const PromotionPanel = () => {
  const { isBoardFlipped, promotionHandler } = useGame();
  const { promotionSquare, promotingColor, onPromotionSelect } =
    promotionHandler;

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

  const calculatePosition = (square: Square): string => {
    const col = square.col;
    const squareSizeInCSS = `calc(var(--size-chess-square) * ${col})`; // i think i can just use the custom property directly
    return squareSizeInCSS;
  };

  const getTopOffset = (index: number, color: PlayerColor): string => {
    const isPlayerOnTop = color === PlayerColor.WHITE;
    const topOfPromotionSquare = `calc(var(--size-chess-square) * ${promotionSquare.row})`;

    if (isPlayerOnTop) {
      return `calc(${topOfPromotionSquare} + calc(var(--size-chess-square) * ${index}))`;
    } else {
      return `calc(${topOfPromotionSquare} - calc(var(--size-chess-square) * ${3 - index}))`;
    }
  };

  return (
    <div className="absolute z-20 flex h-full w-full flex-col backdrop-blur-xs backdrop-filter">
      {promotionPieces.map((type, index) => (
        <div
          key={type}
          className="size-chess-square absolute cursor-pointer from-amber-400 to-amber-700 hover:bg-radial"
          style={{
            top: getTopOffset(index, promotingColor),
            left: calculatePosition(promotionSquare),
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
