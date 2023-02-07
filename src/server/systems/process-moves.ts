// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { Moveset, UsingMove } from "shared/components";
import { UseMove } from "shared/moves";
import Remotes from "shared/remotes";
import { GetEntityFromPlayer } from "shared/util";

const UseMoveRemote = Remotes.Server.Get("UseMove");

function ProcessMoves(world: World) {
	for (const [, player, index] of useEvent("UseMoveRemote", UseMoveRemote)) {
		GetEntityFromPlayer(player).match(
			(id) => {
				const [moveset, usingMove] = world.get(id, Moveset, UsingMove);
				if (moveset && !usingMove) {
					const entity = UseMove(world, id, moveset[index]);
					if (entity !== undefined) {
						world.insert(id, UsingMove({ move: entity }));
					}
				}
			},
			() => {},
		);
	}
}

export = ProcessMoves;
