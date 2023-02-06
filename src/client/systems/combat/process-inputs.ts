// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { LocalPlayer, Moveset, Owner, UsingMove } from "shared/components";
import { useGamejoyBind } from "shared/hooks/use-gamejoy";
import { UseMove } from "shared/moves";
import { IClientState } from "shared/types/state";

function ProcessInputs(world: World, state: IClientState) {
	const [localentity, moveset, _] = world.query(Moveset, LocalPlayer).next();
	if (localentity === undefined || moveset === undefined) return;

	for (const move of moveset) {
		for (const [_] of useGamejoyBind(state.GamejoyContext, state.InputActions[move.keybind])) {
			if (world.get(localentity, UsingMove) !== undefined) continue;
			const entity = UseMove(world, localentity, move);

			if (entity !== undefined) {
				world.insert(localentity, UsingMove({ move: entity }));
			}
		}
	}
}

export = ProcessInputs;
