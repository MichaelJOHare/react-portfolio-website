import { useEffect, useRef, useState } from "react";
import { StockfishVersion } from "@/app/projects/chess/types";
import DropdownArrow from "@/assets/icons/drop-down-arrow.svg";

type VersionMenuProps = {
  version: StockfishVersion;
  onVersionSelect: (version: StockfishVersion) => void;
};

export const StockfishVersionMenu = ({
  version,
  onVersionSelect,
}: VersionMenuProps) => {
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

  const handleSelectVersion = (version: StockfishVersion) => {
    onVersionSelect(version);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block pt-2 text-left">
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
          {version === StockfishVersion.SF16
            ? "Stockfish 16 · "
            : "Stockfish 17.1 · "}
          <span className="float-right">
            {version === StockfishVersion.SF16 ? "7MB" : "79MB"}
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
          <div ref={menuRef} className="py-1" role="none">
            <button
              onClick={() => handleSelectVersion(StockfishVersion.SF16)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 select-none hover:bg-neutral-300"
              role="menuitem"
            >
              {`${version === StockfishVersion.SF16 ? "✓ Stockfish 16 " : "Stockfish 16 "}`}
              <span className="float-right text-gray-500 select-none">7MB</span>
            </button>
            <button
              onClick={() => handleSelectVersion(StockfishVersion.SF17)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 select-none hover:bg-neutral-300"
              role="menuitem"
            >
              {`${version === StockfishVersion.SF17 ? "✓ Stockfish 17.1 " : "Stockfish 17.1 "}`}
              <span className="float-right text-gray-500 select-none">
                79MB
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
