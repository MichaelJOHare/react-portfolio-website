import { useEffect, useRef, useState } from "react";
import { useGame } from "../../../context/GameContext";
import DropdownArrow from "@/assets/icons/drop-down-arrow.svg";

export const StockfishVersionMenu = () => {
  const { setVersion } = useGame();
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
          className="w-56 bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg px-5 py-1.5 text-center inline-flex justify-between items-center"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          Stockfish Version
          <DropdownArrow className="w-2.5 h-2.5 ms-3" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-1/2 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition ease-out duration-100 scale-100 opacity-100 translate-x-1/2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleSelectVersion("sf-16")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Stockfish 16.1 (default){" "}
              <span className="float-right text-gray-400">7MB</span>
            </button>
            <button
              onClick={() => handleSelectVersion("sf-17")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Stockfish 17{" "}
              <span className="float-right text-gray-400">79MB</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
