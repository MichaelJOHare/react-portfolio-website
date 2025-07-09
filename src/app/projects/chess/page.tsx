"use client";

import { useState } from "react";
import { ChessGameContainer } from "./components/ui/ChessGameContainer";
import { GameProvider } from "./context/GameContext";

export default function Page() {
  const [gameKey, setGameKey] = useState(0);

  const handleResetGame = () => {
    setGameKey((prev) => prev + 1);
  };

  return (
    <GameProvider key={gameKey} onResetGame={handleResetGame}>
      <ChessGameContainer />
    </GameProvider>
  );
}
