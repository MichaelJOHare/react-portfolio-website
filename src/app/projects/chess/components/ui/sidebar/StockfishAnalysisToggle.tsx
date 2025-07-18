import { useEffect, useState } from "react";
import { useGame } from "../../../context/GameContext";
import StockfishOptionsIcon from "@/assets/icons/stockfish-options-icon.svg";

export const StockfishAnalysisToggle = () => {
  const { setStockfishEnabled, stockfishEnabled } = useGame();
  const [showIcon, setShowIcon] = useState(stockfishEnabled);

  // delay icon toggle to sync with animation
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
      <label className="group w-56 h-13 bg-neutral-600 relative rounded-full select-none cursor-pointer inline-flex items-center">
        <input
          className="sr-only peer"
          type="checkbox"
          value=""
          checked={stockfishEnabled}
          onChange={(e) => setStockfishEnabled(e.target.checked)}
        />
        <div
          className="w-30 h-full bg-neutral-500 rounded-full group-hover:shadow-md shadow-neutral-700 dark:shadow-slate-900 
        peer-checked:left-[6.5rem] peer-checked:bg-emerald-700 dark:peer-checked:bg-emerald-600 absolute left-0 transition-all duration-300"
        ></div>
        <span className="text-white transition relative w-30 h-full flex items-center justify-center font-medium text-xl">
          Off
        </span>
        <span className="text-neutral-100 transition relative w-30 h-full flex items-center justify-center font-medium text-xl">
          {showIcon ? (
            <StockfishOptionsIcon className="ml-6 w-10 h-10 text-orange-300 drop-shadow-sfOn" />
          ) : (
            "On"
          )}
        </span>
      </label>
    </div>
  );
};
