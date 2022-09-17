// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useEvent, World } from "@rbxts/matter";
import { PlayerComponent, Renderable } from "shared/components";

function PlayersAreRenderable(world: World) {
	for (const [id, player] of world.query(PlayerComponent)) {
		for (const [_, character] of useEvent(player.player, "CharacterAdded")) {
			world.insert(id, Renderable({ model: character }));
		}
	}
}

export = PlayersAreRenderable;
