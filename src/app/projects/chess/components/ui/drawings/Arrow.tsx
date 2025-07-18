import { ArrowProps } from "../../../types";

export const Arrow = ({ x1, y1, x2, y2, isStockfish }: ArrowProps) => {
  const isEmpty = x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0;
  const strokeColor = isStockfish ? "blue" : "green";
  const headLength = isStockfish ? 9 : 7;
  const strokeWidth = 2.25;
  const opacity = 0.7;
  const capRadius = strokeWidth / 2;
  const maskId = `cap-mask-${x1}-${y1}-${x2}-${y2}`;

  const angle = Math.atan2(y2 - y1, x2 - x1);

  const adjustedX2 = x2 - headLength * Math.cos(angle) * 0.85;
  const adjustedY2 = y2 - headLength * Math.sin(angle) * 0.86;

  const arrowPointX = x2 - headLength * Math.cos(angle - Math.PI / 6);
  const arrowPointY = y2 - headLength * Math.sin(angle - Math.PI / 6);
  const arrowPointX2 = x2 - headLength * Math.cos(angle + Math.PI / 6);
  const arrowPointY2 = y2 - headLength * Math.sin(angle + Math.PI / 6);

  return (
    <svg
      className={`absolute top-0 left-0 pointer-events-none ${
        isStockfish ? "z-30" : "z-31"
      }`}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
    >
      <defs>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="black" />
          <g
            transform={`rotate(${(angle * 180) / Math.PI - 90}, ${x1}, ${y1})`}
          >
            <path
              d={`
          M ${x1} ${y1}
          m ${-capRadius} 0
          a ${capRadius} ${capRadius} 0 0 1 ${capRadius * 2} 0
          z
        `}
              fill="white"
            />
          </g>
        </mask>
      </defs>

      {!isEmpty && (
        <>
          <line
            x1={x1}
            y1={y1}
            x2={adjustedX2}
            y2={adjustedY2}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            opacity={opacity}
          />
          <circle
            cx={x1}
            cy={y1}
            r={capRadius}
            fill={strokeColor}
            mask={`url(#${maskId})`}
            opacity={opacity}
          />
          <polygon
            points={`${x2},${y2} ${arrowPointX},${arrowPointY} ${arrowPointX2},${arrowPointY2}`}
            fill={strokeColor}
            opacity={opacity}
          />
        </>
      )}
    </svg>
  );
};
