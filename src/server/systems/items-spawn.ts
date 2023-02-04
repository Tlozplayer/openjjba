// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { ItemComponent, Renderable, Transform } from "shared/components";
import { useTimer } from "shared/hooks/use-timer";
import { Item, ItemToModel } from "shared/types/items";

const ItemSpawnRules: { [index in Item]: (world: World) => boolean } = {
	[Item.StandDisc]: (world: World) => {
		let itemCount = 0;
		for (const [_] of world.query(ItemComponent)) {
			itemCount++;
		}

		if (itemCount < 3) {
			return useTimer(5) && itemCount < 3;
		}

		return false;
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
		if (canSpawn(world)) {
			const ItemModel = ItemToModel[item].Clone();
			world.spawn(
				ItemComponent({ id: item }),
				Renderable({ model: ItemModel }),
				Transform({ cframe: new CFrame(0, 10, 0), _doNotReconcile: false }),
			);
			ItemModel.Parent = Workspace;
		}
	}
}

export = ItemsSpawn;
