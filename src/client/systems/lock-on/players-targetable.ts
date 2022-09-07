import { World } from "@rbxts/matter";
import { LocalPlayerComponent, PlayerComponent, Renderable, Targetable } from "shared/components";

function PlayersAreTargetable(world: World) {
	for (const [id] of world.query(Renderable, PlayerComponent).without(LocalPlayerComponent, Targetable)) {
		world.insert(id, Targetable());
	}
}

export = PlayersAreTargetable;
