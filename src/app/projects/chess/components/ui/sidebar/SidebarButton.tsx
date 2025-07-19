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
        className="rounded-sm p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={onClick}
        aria-label={label}
      >
        {icons[icon]}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-10 -left-6 w-max rounded-lg bg-zinc-700 px-2 py-2 text-sm font-medium text-neutral-100 opacity-0 shadow-xs transition-opacity duration-300 group-hover:opacity-100 dark:bg-neutral-300 dark:text-neutral-900"
      >
        {label}
      </span>
    </div>
  );
};
