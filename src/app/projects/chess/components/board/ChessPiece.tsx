import { useDraggable } from "@dnd-kit/core";
import { PieceType, PlayerColor, Square } from "../../types";
import { useGame } from "../../context/GameContext";
import { flipSquare } from "../../utils";

type ChessPieceProps = {
  type: PieceType;
  color: PlayerColor;
  square: Square;
};

export const ChessPiece = ({ type, color, square }: ChessPieceProps) => {
  const { isBoardFlipped, pieceAnimator } = useGame();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${square.row}-${square.col}`,
    });
  const pieceImagePath = `/assets/images/${color}-${type}.svg`;
  const animatingPiece = pieceAnimator.getAnimatingPiece(square);
  const isAnimating = !!animatingPiece;
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  const scale = isMobile ? 1.75 : 1;

  const animationTransform = () => {
    if (!isAnimating || !animatingPiece) return "";
    const { startSquare, endSquare } = animatingPiece;

    const realStart = isBoardFlipped ? flipSquare(startSquare) : startSquare;
    const realEnd = isBoardFlipped ? flipSquare(endSquare) : endSquare;
    const deltaRow = realEnd.row - realStart.row;
    const deltaCol = realEnd.col - realStart.col;

    const translateX = `${deltaCol * 100}%`;
    const translateY = `${deltaRow * 100}%`;

    return `translate(${translateX}, ${translateY})`;
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName === "transform" && isAnimating) {
      pieceAnimator.completeAnimation(square);
    }
  };

  const pieceStyle = () => {
    if (transform) {
      return {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${scale})`,
        transformOrigin: "center center",
      };
    }

    if (isAnimating) {
      return {
        transform: animationTransform(),
        transition: "transform var(--animation-piece-slide)",
        transformOrigin: "center center",
      };
    }

    return undefined;
  };

  const interactionProps = isAnimating ? {} : { ...listeners, ...attributes };
  const baseImageClasses = `h-full select-none ${isBoardFlipped ? "rotate-180" : ""}`;
  const ghostImageClasses = `pointer-events-none z-0 opacity-50 ${baseImageClasses}`;
  const mainImageClasses = `absolute z-10 ${baseImageClasses} ${
    isDragging
      ? "z-20 cursor-grabbing"
      : isAnimating
        ? "z-20"
        : "cursor-pointer"
  }`;

  return (
    <>
      {isDragging && (
        <img
          className={ghostImageClasses}
          src={pieceImagePath}
          alt={`${type}-ghost`}
        />
      )}
      <img
        className={mainImageClasses}
        ref={setNodeRef}
        style={pieceStyle()}
        onTransitionEnd={handleTransitionEnd}
        {...interactionProps}
        src={pieceImagePath}
        alt={type}
      />
    </>
  );
};
