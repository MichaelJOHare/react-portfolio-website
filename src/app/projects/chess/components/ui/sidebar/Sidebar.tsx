import { useState, useEffect } from "react";
import { toFEN } from "../../../utils/FEN";
import { StockfishOptionsModal } from "./options/StockfishOptionsModal";
import { useGame } from "../../../context/GameContext";
import { SidebarButton } from "./SidebarButton";
import { MoveList } from "./MoveList";
import { getGameStatus } from "../../../utils";

export const Sidebar = () => {
  const { gameManager, stockfishHandler, toggleFlipBoard, onResetGame } =
    useGame();
  const {
    board,
    players,
    currentPlayerIndex,
    halfMoveClock,
    fullMoveNumber,
    moveHistory,
    piecesByPlayer,
    loadFromFEN,
  } = gameManager;
  const { terminateWorker } = stockfishHandler;
  const [showFenTextArea, setShowFenTextArea] = useState(false);
  const [showStockfishOptions, setShowStockfishOptions] = useState(false);
  const [fenValue, setFenValue] = useState("");
  const [fenStatus, setFenStatus] = useState<
    | "Valid"
    | "Valid Check"
    | "Valid Checkmate"
    | "Invalid FEN string"
    | "Paste FEN string here"
  >("Paste FEN string here");
  const movesHistory = moveHistory.map((record) => record.move);

  const onFlipBoard = () => {
    toggleFlipBoard();
  };

  const handleResetGame = () => {
    terminateWorker();
    onResetGame();
  };

  const onToggleFenTextArea = () => {
    setShowFenTextArea((v) => {
      if (!v) {
        setFenStatus("Paste FEN string here");
      }
      return !v;
    });
  };

  const updateStateOnFenChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const fenString = event.target.value.trim();
    setFenValue(fenString);

    if (!fenString) {
      setFenStatus("Paste FEN string here");
      return;
    }

    const success = loadFromFEN(fenString);
    const { causedCheck, causedCheckMate } = getGameStatus(
      board,
      players[currentPlayerIndex],
      players[1 - currentPlayerIndex],
      piecesByPlayer,
      moveHistory,
    );

    if (!success) {
      setFenStatus("Invalid FEN string");
    } else if (causedCheckMate) {
      setFenStatus("Valid Checkmate"); // fix this
    } else if (causedCheck) {
      setFenStatus("Valid Check");
    } else {
      setFenStatus("Valid");
    }
  };

  useEffect(() => {
    if (showFenTextArea) {
      const currentFen = toFEN(
        board,
        players,
        currentPlayerIndex,
        movesHistory,
        halfMoveClock,
        fullMoveNumber,
      );
      setFenValue(currentFen);
    }
  }, [
    showFenTextArea,
    board,
    players,
    currentPlayerIndex,
    movesHistory,
    halfMoveClock,
    fullMoveNumber,
  ]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative h-full min-h-0 w-full">
        <div className="flex h-full w-full flex-col rounded-lg border border-gray-200 bg-neutral-300 dark:border-gray-600 dark:bg-gray-700">
          <div className="flex flex-shrink-0 items-center justify-center border-b border-gray-400 px-3 py-2 dark:border-gray-600">
            <div className="flex w-full max-w-lg items-center justify-between">
              <SidebarButton
                icon="flipBoard"
                label="Flip Board"
                onClick={onFlipBoard}
              />
              <SidebarButton
                icon="fen"
                label="Import/export FEN"
                onClick={onToggleFenTextArea}
              />
              <SidebarButton
                icon="reset"
                label="Reset Game"
                onClick={handleResetGame}
              />
              <SidebarButton
                icon="stockfish"
                label="Stockfish Options"
                onClick={() => setShowStockfishOptions(true)}
              />
              <StockfishOptionsModal
                isOpen={showStockfishOptions}
                onClose={() => setShowStockfishOptions(false)}
              />
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col rounded-b-lg bg-neutral-100 px-4 py-2 dark:bg-gray-800">
            <div
              className={`overflow-y-auto ${
                showFenTextArea ? "min-h-0 flex-1" : "h-full"
              }`}
              style={{ scrollbarGutter: "stable" }}
            >
              <MoveList />
            </div>
            {showFenTextArea && (
              <>
                <textarea
                  className="mt-2 resize-none rounded-sm border border-gray-300 p-2"
                  rows={4}
                  value={fenValue}
                  onChange={updateStateOnFenChange}
                  placeholder="Paste FEN string here..."
                  spellCheck="false"
                />
                <div
                  className={`mt-1 ml-1.5 text-sm ${
                    fenStatus === "Valid"
                      ? "text-emerald-500"
                      : fenStatus === "Invalid FEN string"
                        ? "text-rose-700 dark:text-rose-400"
                        : "text-shadow-neutral-600 dark:text-neutral-200"
                  }`}
                >
                  {fenStatus === "Valid"
                    ? `Current player: ${players[currentPlayerIndex].color}`
                    : fenStatus}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
