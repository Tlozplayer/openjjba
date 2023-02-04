import { World } from "@rbxts/matter";
import { UsingMove } from "shared/components";

function RemoveUsingMove(world: World) {
	for (const [id, move] of world.query(UsingMove)) {
		if (!world.contains(move.move)) {
			world.remove(id, UsingMove);
		}
	}
}

export = RemoveUsingMove;
