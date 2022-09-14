import { World } from "@rbxts/matter";
import { PlayerLike, Renderable, Targetable } from "shared/components";

function PlayersAreTargetable(world: World) {
	for (const [id] of world.query(Renderable, PlayerLike).without(Targetable)) {
		world.insert(id, Targetable());
	}
}

export = PlayersAreTargetable;
