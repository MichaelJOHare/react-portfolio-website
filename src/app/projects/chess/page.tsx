"use client";

import { useState } from "react";
import { GameProvider } from "./context/GameContext";
import { ChessContainer } from "./components/ui/ChessContainer";

export default function Page() {
  const [gameKey, setGameKey] = useState(0);

  const handleResetGame = () => {
    setGameKey((prev) => prev + 1);
  };

  return (
    <GameProvider key={gameKey} onResetGame={handleResetGame}>
      <ChessContainer />
    </GameProvider>
  );
}
