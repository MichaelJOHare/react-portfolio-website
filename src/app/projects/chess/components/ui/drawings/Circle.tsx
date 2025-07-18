import { CircleProps } from "../../../types";

export const Circle = ({ cx, cy }: CircleProps) => {
  const isEmpty = cx === 0 && cy === 0;

  return (
    <svg
      className="absolute top-0 left-0 z-30 pointer-events-none"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
    >
      {!isEmpty && (
        <circle
          cx={cx}
          cy={cy}
          r={5.75}
          stroke={"green"}
          strokeWidth={0.8}
          fill="transparent"
          opacity="0.7"
        />
      )}
    </svg>
  );
};
