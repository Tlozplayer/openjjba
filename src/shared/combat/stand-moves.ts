import { Stand } from "shared/types/stands";
import { Move, MoveData, Moves, FMove } from "./moves";

export const StandMoves: { [index in Stand]: Move[] } = {
	[Stand.Standless]: [],
	[Stand.ZaShadow]: [FMove(Moves.Summon, { cooldown: 5 })],
};
