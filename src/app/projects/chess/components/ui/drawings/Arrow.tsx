import { ArrowProps } from "../../../types";

export const Arrow = ({ x1, y1, x2, y2, isStockfish }: ArrowProps) => {
  const isEmpty = x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0;
  const headLength = 7;
  const strokeWidth = 2.25;
  const opacity = 0.7;

  const angle = Math.atan2(y2 - y1, x2 - x1);

  const adjustedX2 = x2 - headLength * Math.cos(angle) * 0.85;
  const adjustedY2 = y2 - headLength * Math.sin(angle) * 0.85;

  const arrowPointX = x2 - headLength * Math.cos(angle - Math.PI / 6);
  const arrowPointY = y2 - headLength * Math.sin(angle - Math.PI / 6);
  const arrowPointX2 = x2 - headLength * Math.cos(angle + Math.PI / 6);
  const arrowPointY2 = y2 - headLength * Math.sin(angle + Math.PI / 6);

  return (
    <svg
      className="absolute top-0 left-0 z-10 pointer-events-none"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
    >
      {!isEmpty && (
        <line
          x1={x1}
          y1={y1}
          x2={adjustedX2}
          y2={adjustedY2}
          stroke={isStockfish ? "blue" : "green"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={opacity}
        />
      )}
      {!isEmpty && (
        <polygon
          points={`${x2},${y2} ${arrowPointX},${arrowPointY} ${arrowPointX2},${arrowPointY2}`}
          fill={isStockfish ? "blue" : "green"}
          opacity={opacity}
        />
      )}
    </svg>
  );
};
