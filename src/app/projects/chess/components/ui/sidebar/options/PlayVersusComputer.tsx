import { ColorChoice, StrengthLevel } from "../../../../types";
import { ColorChoiceButtons } from "./ColorChoiceButtons";
import { StrengthLevelButtons } from "./StrengthLevelButtons";

type PlayVersusComputerProps = {
  tempStrengthLevel: StrengthLevel;
  tempColorChoice: ColorChoice;
  isPlaying: boolean;
  optionUnselected: boolean;
  onStrengthLevelChange: (level: StrengthLevel) => void;
  onColorChoiceChange: (color: ColorChoice) => void;
  onPlayToggle: () => void;
};

export const PlayVersusComputer = ({
  tempStrengthLevel,
  tempColorChoice,
  isPlaying,
  optionUnselected,
  onStrengthLevelChange,
  onColorChoiceChange,
  onPlayToggle,
}: PlayVersusComputerProps) => {
  return (
    <div className="flex h-full flex-col">
      <h2 className="self-center text-2xl font-medium select-none">
        Play Versus Computer
      </h2>
      <div className="flex flex-1 flex-col justify-evenly">
        <div className="flex flex-col">
          <h3 className="self-center pb-2 text-xl font-bold select-none">
            Strength level
          </h3>
          <StrengthLevelButtons
            selectedValue={tempStrengthLevel}
            isPlaying={isPlaying}
            onChange={onStrengthLevelChange}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="self-center pb-2 text-xl font-bold select-none">
            Choose Color
          </h3>
          <ColorChoiceButtons
            selectedValue={tempColorChoice}
            isPlaying={isPlaying}
            onClick={onColorChoiceChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          disabled={optionUnselected}
          className="h-14 w-full rounded-lg bg-neutral-600 pb-1 text-3xl font-medium text-neutral-100 not-disabled:bg-emerald-600 hover:shadow-md hover:shadow-neutral-600 not-disabled:hover:bg-emerald-500 disabled:cursor-not-allowed disabled:shadow-none dark:bg-teal-800 dark:hover:shadow-slate-900"
          onClick={onPlayToggle}
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>
    </div>
  );
};
