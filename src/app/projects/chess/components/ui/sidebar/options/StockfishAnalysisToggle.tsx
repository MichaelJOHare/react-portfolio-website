import { useEffect, useState } from "react";
import { useGame } from "@/app/projects/chess/context/GameContext";
import StockfishOptionsIcon from "@/assets/icons/stockfish-options-icon.svg";

type SfAnalysisProps = {
  onAnalysisToggle: (sfEnabled: boolean) => void;
  disabled: boolean;
};

export const StockfishAnalysisToggle = ({
  onAnalysisToggle,
  disabled,
}: SfAnalysisProps) => {
  const { setStockfishEnabled, stockfishEnabled } = useGame();
  const [showIcon, setShowIcon] = useState(stockfishEnabled);

  // delays icon toggle to sync with animation
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (stockfishEnabled) {
      timeout = setTimeout(() => setShowIcon(true), 100);
    } else {
      setShowIcon(false);
    }
    return () => clearTimeout(timeout);
  }, [stockfishEnabled]);

  return (
    <div className="group relative">
      <label className="group relative inline-flex h-13 w-56 cursor-pointer items-center rounded-full bg-neutral-600 select-none">
        <input
          className="peer sr-only"
          type="checkbox"
          value=""
          disabled={disabled}
          checked={stockfishEnabled}
          onChange={(e) => {
            setStockfishEnabled(e.target.checked);
            onAnalysisToggle(false);
          }}
        />
        <div className="absolute h-full w-30 rounded-full bg-neutral-500 shadow-sm shadow-neutral-700 transition will-change-[box-shadow] group-hover:shadow-md peer-checked:translate-x-26 peer-checked:bg-emerald-700 peer-checked:will-change-auto dark:shadow-slate-900 dark:peer-checked:bg-emerald-600" />
        <span className="relative flex h-full w-30 items-center justify-center text-xl font-medium text-neutral-100">
          Off
        </span>
        <span className="relative flex h-full w-30 items-center justify-center text-xl font-medium text-neutral-100">
          <div className="relative flex h-full w-full items-center justify-center">
            <span
              className={`absolute transition-opacity duration-100 ease-in ${
                showIcon ? "opacity-0" : "opacity-100"
              }`}
            >
              On
            </span>
            <StockfishOptionsIcon
              className={`drop-shadow-sfOn absolute ml-6 h-10 w-10 text-orange-300 transition-opacity duration-100 ease-in ${
                showIcon ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </span>
      </label>
    </div>
  );
};
