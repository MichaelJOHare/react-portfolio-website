import { ColorChoice } from "../../../../types";
import BlackKing from "@/assets/icons/black-king.svg";
import WhiteKing from "@/assets/icons/white-king.svg";
import RandomKing from "@/assets/icons/random-king.svg";

type ColorChoiceButtonsProps = {
  selectedValue: number;
  isPlaying: boolean;
  onClick: (color: number) => void;
};

export const ColorChoiceButtons = ({
  selectedValue,
  isPlaying,
  onClick,
}: ColorChoiceButtonsProps) => {
  const colorOptions = [
    {
      Icon: WhiteKing,
      value: ColorChoice.WHITE,
    },
    {
      Icon: RandomKing,
      value: ColorChoice.RANDOM,
    },
    {
      Icon: BlackKing,
      value: ColorChoice.BLACK,
    },
  ];

  return (
    <ul className="flex gap-3 self-center">
      {colorOptions.map(({ Icon, value }) => {
        const isSelected = selectedValue === value;
        const isHoverable = !isSelected && !isPlaying;

        return (
          <button
            key={value}
            type="button"
            disabled={isPlaying}
            className={`rounded-lg hover:shadow-md disabled:cursor-not-allowed disabled:shadow-none ${
              isSelected
                ? "bg-emerald-500 dark:bg-emerald-400"
                : isHoverable
                  ? "bg-neutral-500 hover:bg-neutral-600 hover:shadow-neutral-600 dark:bg-teal-700 dark:hover:bg-teal-800 dark:hover:shadow-slate-900"
                  : "bg-neutral-500 dark:bg-teal-700"
            } `}
            onClick={() => onClick(value)}
          >
            <Icon className="h-18 w-18 scale-[99%]" />
          </button>
        );
      })}
    </ul>
  );
};
