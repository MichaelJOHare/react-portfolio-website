import { useEffect, useState } from "react";
import { useGame } from "../../../context/GameContext";
import StockfishOptionsIcon from "@/assets/icons/stockfish-options-icon.svg";

export const StockfishAnalysisToggle = () => {
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
          checked={stockfishEnabled}
          onChange={(e) => setStockfishEnabled(e.target.checked)}
        />
        <div className="absolute left-0 h-full w-30 rounded-full bg-neutral-500 shadow-neutral-700 transition-all duration-300 group-hover:shadow-md peer-checked:left-26 peer-checked:bg-emerald-700 dark:shadow-slate-900 dark:peer-checked:bg-emerald-600"></div>
        <span className="relative flex h-full w-30 items-center justify-center text-xl font-medium text-white transition">
          Off
        </span>
        <span className="relative flex h-full w-30 items-center justify-center text-xl font-medium text-neutral-100 transition">
          {showIcon ? (
            <StockfishOptionsIcon className="drop-shadow-sfOn ml-6 h-10 w-10 text-orange-300" />
          ) : (
            "On"
          )}
        </span>
      </label>
    </div>
  );
};
