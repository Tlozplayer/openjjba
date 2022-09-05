import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { PlayerEntity } from "server/plugins/load-player-data";
import { ItemComponent, PlayerData } from "shared/components";
import Remotes from "shared/remotes";

const PickupItem = Remotes.Server.Get("PickupItem");

function HandleItemPickups(world: World) {
	for (const [_, player, itemId] of useEvent("PickupItem", PickupItem)) {
		const entityId = tonumber(itemId) as AnyEntity;
		if (!world.contains(entityId)) return;

		const item = world.get(entityId, ItemComponent);

		if (item) {
			const playerEntity = PlayerEntity.get(player);
			if (playerEntity === undefined) return;

			const data = world.get(playerEntity, PlayerData);
			if (!data) return;

			data.patch({ inventory: [...data.inventory, { item: item.id }] });
			world.despawn(entityId);
		}
	}
}

export = HandleItemPickups;
