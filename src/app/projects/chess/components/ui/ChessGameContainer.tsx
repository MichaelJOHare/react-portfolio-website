"use client";

import { useEffect, useState } from "react";
import { Board } from "../board/Board";
import { useChessGame } from "../../hooks/useChessGame";
import { useHighlighter } from "../../hooks/useHighlighter";
import { usePromotionPanel } from "../../hooks/usePromotionPanel";
import { usePieceSelection } from "../../hooks/usePieceSelection";

export const ChessGameContainer = () => {
  const [isBoardFlipped, setisBoardFlipped] = useState(false);
  const gameManager = useChessGame(isBoardFlipped);
  const promotionHandler = usePromotionPanel(isBoardFlipped, gameManager);
  const highlighter = useHighlighter();
  const pieceSelector = usePieceSelection(
    gameManager,
    highlighter,
    promotionHandler
  );

  useEffect(() => {
    gameManager.initializeBoard();
  }, []);

  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <div className="flex justify-center items-center">
        <Board
          gameManager={gameManager}
          highlighter={highlighter}
          pieceSelector={pieceSelector}
          promotionHandler={promotionHandler}
          isBoardFlipped={isBoardFlipped}
        />
      </div>
    </div>
  );
};
