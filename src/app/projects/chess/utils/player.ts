import { Player, PlayerColor, PlayerType } from "../types";

export const createPlayer = (color: PlayerColor, type: PlayerType): Player => ({
  id: color === PlayerColor.WHITE ? "white" : "black",
  color,
  type,
});

export const isComputerPlaying = (player1: Player, player2: Player) => {
  return (
    player1.type === PlayerType.COMPUTER || player2.type === PlayerType.COMPUTER
  );
};
