// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Owner } from "shared/components";

function DespawnOwned(world: World) {
	for (const [id, owner] of world.query(Owner)) {
		if (!world.contains(owner.owner)) {
			world.despawn(id);
		}
	}
}

export = DespawnOwned;
