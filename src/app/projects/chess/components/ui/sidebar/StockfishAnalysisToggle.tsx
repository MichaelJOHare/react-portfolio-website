import { useGame } from "../../../context/GameContext";

export const StockfishAnalysisToggle = () => {
  const { setStockfishEnabled, stockfishEnabled } = useGame();

  return (
    <div className="group relative">
      <label className="group w-56 h-13 bg-neutral-500 relative rounded-full select-none cursor-pointer inline-flex items-center">
        <input
          className="sr-only peer"
          type="checkbox"
          value=""
          checked={stockfishEnabled}
          onChange={(e) => setStockfishEnabled(e.target.checked)}
        />
        <div className="w-30 h-full bg-cyan-700 rounded-full shadow-blue-500 group-hover:shadow-sm peer-checked:left-[7.5rem] peer-checked:bg-cyan-600 absolute peer-checked:ring-cyan-600 left-0 transition-all duration-300"></div>
        <span className="transition relative w-30 h-full flex items-center justify-center font-medium">
          Off
        </span>
        <span className="transition relative w-30 h-full flex items-center justify-center font-medium">
          On
        </span>
      </label>
    </div>
  );
};
