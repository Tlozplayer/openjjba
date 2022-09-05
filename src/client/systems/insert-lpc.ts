import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlayerComponent, PlayerComponent } from "shared/components";

function InsertLocalPlayerComponent(world: World) {
	for (const [id, player] of world.queryChanged(PlayerComponent)) {
		if (player.new) {
			if (player.new.player === Players.LocalPlayer) {
				world.insert(id, LocalPlayerComponent({ localplayer: Players.LocalPlayer }));
			}
		}
	}
}

export = InsertLocalPlayerComponent;
