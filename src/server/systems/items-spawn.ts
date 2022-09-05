import { useThrottle, World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { ItemComponent, Renderable } from "shared/components";
import { Item, ItemToModel } from "shared/types/items";

let first_run = true;
const ItemSpawnRules: { [index in Item]: (world: World) => boolean } = {
	[Item.StandDisc]: () => {
		return useThrottle(3);
	},

	[Item.Arrow]: () => {
		return false;
	},

	[Item.ArrowFragment]: () => {
		return false;
	},
};

function ItemsSpawn(world: World) {
	for (const [item, canSpawn] of pairs(ItemSpawnRules)) {
		if (canSpawn(world) && first_run === false) {
			const ItemModel = ItemToModel[item].Clone();
			world.spawn(ItemComponent({ id: item }), Renderable({ model: ItemModel }));

			ItemModel.MoveTo(new Vector3(0, 0, 0));
			ItemModel.Parent = Workspace;
		}
	}

	first_run = false;
}

export = ItemsSpawn;
