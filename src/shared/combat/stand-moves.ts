import { Stand } from "shared/types/stands";
import { Move, MoveData, Moves, MergeMove } from "./moves";

export const StandMoves: { [index in Stand]: Move[] } = {
	[Stand.Standless]: [],
	[Stand.ZaShadow]: [MergeMove(Moves.Summon, { cooldown: 5 })],
};
