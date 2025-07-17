import ResetIcon from "@/assets/icons/reset-game.svg";
import FenIcon from "@/assets/icons/fen-icon.svg";
import StockfishOptionsIcon from "@/assets/icons/stockfish-options-icon.svg";
import FlipBoardIcon from "@/assets/icons/flip-board.svg";

type GameLogButtonProps = {
  icon: "flipBoard" | "fen" | "reset" | "stockfish";
  label: string;
  onClick: () => void;
};

export const SidebarButton = ({ icon, label, onClick }: GameLogButtonProps) => {
  const icons = {
    flipBoard: <FlipBoardIcon className="size-10" />,
    fen: <FenIcon className="size-10" />,
    reset: <ResetIcon className="size-10" />,
    stockfish: <StockfishOptionsIcon className="size-10" />,
  };

  return (
    <div className="group relative">
      <button
        type="button"
        className="p-2 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        onClick={onClick}
        aria-label={label}
      >
        {icons[icon]}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute px-2 py-2 -top-10 -left-6 w-max opacity-0 transition-opacity group-hover:opacity-100 text-sm font-medium text-white duration-300 bg-gray-900 rounded-lg shadow-xs dark:bg-gray-800"
      >
        {label}
      </span>
    </div>
  );
};
