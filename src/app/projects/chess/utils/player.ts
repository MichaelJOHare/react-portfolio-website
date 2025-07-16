import { Player, PlayerColor, PlayerType } from "../types";

export const createPlayer = (color: PlayerColor, type: PlayerType): Player => ({
  id: color === PlayerColor.WHITE ? "white" : "black",
  color,
  type,
});
