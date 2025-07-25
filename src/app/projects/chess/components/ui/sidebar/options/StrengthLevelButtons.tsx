type StrengthLevelButtonsProps = {
  selectedValue: number;
  isPlaying: boolean;
  onChange: (level: number) => void;
};

export const StrengthLevelButtons = ({
  selectedValue,
  isPlaying,
  onChange,
}: StrengthLevelButtonsProps) => {
  const strengthLevels = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <ul className="grid grid-cols-4 gap-2 self-center">
      {strengthLevels.map((level) => {
        const isSelected = selectedValue === level;
        const isHoverable = !isSelected && !isPlaying;

        return (
          <button
            type="button"
            key={level}
            disabled={isPlaying}
            className={`size-12 rounded-lg px-1 text-4xl text-neutral-100 hover:shadow-md disabled:cursor-not-allowed disabled:shadow-none ${
              isSelected
                ? "bg-emerald-500 dark:bg-emerald-400"
                : isHoverable
                  ? "bg-neutral-500 hover:bg-neutral-600 hover:shadow-neutral-600 dark:bg-teal-700 dark:hover:bg-teal-800 dark:hover:shadow-slate-900"
                  : "bg-neutral-500 dark:bg-teal-700"
            } `}
            onClick={() => onChange(level)}
          >
            {level}
          </button>
        );
      })}
    </ul>
  );
};
