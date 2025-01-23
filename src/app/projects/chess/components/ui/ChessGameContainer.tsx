"use client";

import { useEffect, useState } from "react";
import { useChessGame } from "../../hooks/useChessGame";
import { Board } from "../board/Board";

export const ChessGameContainer = () => {
  const [isBoardFlipped, setisBoardFlipped] = useState(false);
  const gameManager = useChessGame(isBoardFlipped);

  useEffect(() => {
    gameManager.initializeBoard();
  }, []);

  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <div className="flex justify-center items-center">
        <Board gameManager={gameManager} isBoardFlipped={isBoardFlipped} />
      </div>
    </div>
  );
};
