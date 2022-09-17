// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { PlayerLike, Renderable, Targetable } from "shared/components";

function PlayersAreTargetable(world: World) {
	for (const [id] of world.query(Renderable, PlayerLike).without(Targetable)) {
		world.insert(id, Targetable());
	}
}

export = PlayersAreTargetable;
