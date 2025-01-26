"use client";

import { useEffect, useState } from "react";
import { useChessGame } from "../../hooks/useChessGame";
import { useHighlighter } from "../../hooks/useHighlighter";
import { Board } from "../board/Board";

export const ChessGameContainer = () => {
  const [isBoardFlipped, setisBoardFlipped] = useState(false);
  const gameManager = useChessGame(isBoardFlipped);
  const highlighter = useHighlighter();

  useEffect(() => {
    gameManager.initializeBoard();
  }, []);

  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <div className="flex justify-center items-center">
        <Board
          gameManager={gameManager}
          isBoardFlipped={isBoardFlipped}
          highlighter={highlighter}
        />
      </div>
    </div>
  );
};
