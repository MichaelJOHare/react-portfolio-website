"use client";

import { ChessGameContainer } from "./components/ui/ChessGameContainer";
import { GameProvider } from "./context/GameContext";

export default function Page() {
  return (
    <GameProvider>
      <ChessGameContainer />
    </GameProvider>
  );
}
