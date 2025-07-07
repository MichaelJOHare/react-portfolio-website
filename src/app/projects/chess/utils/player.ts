import { v4 as uuidv4 } from "uuid";
import { Player, PlayerColor, PlayerType } from "../types";

export const createPlayer = (color: PlayerColor, type: PlayerType): Player => ({
  id: uuidv4(),
  color,
  type,
});
