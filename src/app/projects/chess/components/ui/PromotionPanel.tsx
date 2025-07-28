import { PieceType, PlayerColor } from "../../types";
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

  const getPromotionStyles = (index: number): React.CSSProperties => {
    const { row, col } = promotionSquare;
    const isPlayerOnTop = promotingColor === PlayerColor.WHITE;

    const gridColumn = col + 1;
    let gridRow: number;

    if (isPlayerOnTop) {
      gridRow = row + 1 + index;
    } else {
      gridRow = row + 1 - (3 - index);
    }

    return {
      gridColumn,
      gridRow,
    };
  };

  return (
    <div className="absolute inset-0 z-20 grid grid-cols-8 grid-rows-8 backdrop-blur-xs backdrop-filter">
      {promotionPieces.map((type, index) => (
        <div
          key={type}
          className="size-full cursor-pointer from-amber-400 to-amber-700 hover:bg-radial"
          style={getPromotionStyles(index)}
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
