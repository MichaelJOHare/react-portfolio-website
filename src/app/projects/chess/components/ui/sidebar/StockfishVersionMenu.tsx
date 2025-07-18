import { useEffect, useRef, useState } from "react";
import { useGame } from "../../../context/GameContext";
import DropdownArrow from "@/assets/icons/drop-down-arrow.svg";

export const StockfishVersionMenu = () => {
  const { setVersion, version } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectVersion = (version: "sf-16" | "sf-17") => {
    setVersion(version);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <div className="flex justify-center">
        {/* put green circle next to currently selected version */}
        <button
          type="button"
          className="inline-flex w-56 items-center justify-between rounded-md bg-neutral-500 px-5 py-1.5 text-center font-medium text-neutral-100 hover:bg-neutral-700 hover:shadow-sm hover:shadow-neutral-600 dark:bg-teal-700 dark:hover:bg-teal-800 dark:hover:shadow-slate-800"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          {version === "sf-16" ? "Stockfish 16.1 · " : "Stockfish 17 · "}
          <span className="float-right">
            {version === "sf-16" ? "7MB" : "79MB"}
          </span>
          <DropdownArrow className="ms-3 h-2.5 w-2.5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-1/2 z-10 w-56 origin-top-right translate-x-1/2 scale-100 rounded-md bg-neutral-200 opacity-100 shadow-lg ring-1 ring-black/5 transition duration-100 ease-out"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleSelectVersion("sf-16")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-neutral-300"
              role="menuitem"
            >
              {`${
                version === "sf-16" ? "✓ Stockfish 16.1 " : "Stockfish 16.1 "
              }`}
              <span className="float-right text-gray-500">7MB</span>
            </button>
            <button
              onClick={() => handleSelectVersion("sf-17")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-neutral-300"
              role="menuitem"
            >
              {`${version === "sf-17" ? "✓ Stockfish 17 " : "Stockfish 17 "}`}
              <span className="float-right text-gray-500">79MB</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
