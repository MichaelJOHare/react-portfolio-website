"use client";

import { useEffect, useState } from "react";
import { useChessGame } from "../../hooks/useChessGame";
import { Board } from "../board/Board";

export const ChessGameContainer = () => {
  const gameManager = useChessGame();
  const [isBoardFlipped, setisBoardFlipped] = useState(false);

  useEffect(() => {
    gameManager.initializeBoard(isBoardFlipped);
  }, []);

  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <div className="flex justify-center items-center">
        <Board board={gameManager.board} isBoardFlipped={isBoardFlipped} />
      </div>
    </div>
  );
};
