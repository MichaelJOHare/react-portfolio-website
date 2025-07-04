import { PieceType, PlayerColor, PromotionHandler, Square } from "../../types";

type PromotionPanelProps = {
  isBoardFlipped: boolean;
  promotionHandler: PromotionHandler;
};

type Positions = {
  top: string;
  left: string;
  topLg: string;
  leftLg: string;
};

export const PromotionPanel = ({
  isBoardFlipped,
  promotionHandler,
}: PromotionPanelProps) => {
  const { promotionSquare, promotingColor, onPromotionSelect } =
    promotionHandler;
  const isLargeScreen = true;
  /*   const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) =>
      setIsLargeScreen(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
 */
  if (!promotionSquare || !promotingColor) return null;

  const promotionPieces: PieceType[] =
    promotingColor === PlayerColor.WHITE
      ? [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT]
      : [PieceType.KNIGHT, PieceType.BISHOP, PieceType.ROOK, PieceType.QUEEN];

  // account for isBoardFlipped for both of these

  const calculatePosition = (square: Square, color: PlayerColor): Positions => {
    return {
      top: color === PlayerColor.WHITE ? "0vmin" : "90vmin",
      left: `${(90 / 8) * square.col}vmin`,
      topLg: color === PlayerColor.WHITE ? "0vmin" : "70vmin",
      leftLg: `${(70 / 8) * square.col}vmin`,
    };
  };

  const positions = calculatePosition(promotionSquare, promotingColor);

  return (
    <div className="absolute w-full h-full flex flex-col backdrop-filter backdrop-blur-sm z-20">
      {promotionPieces.map((type, index) => (
        <div
          key={type}
          className="absolute w-[11.25vmin] h-[11.25vmin] cursor-pointer lg:w-[8.75vmin] lg:h-[8.75vmin]"
          style={{
            top: `${
              promotingColor === PlayerColor.WHITE
                ? isLargeScreen
                  ? index * 8.75
                  : index * 11
                : isLargeScreen
                ? 35 + index * 8.75
                : 45 + index * 11
            }vmin`,
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
