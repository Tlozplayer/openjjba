// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { LocalPlayer, Moveset } from "shared/components";
import { useGamejoyBind } from "shared/hooks/useGamejoy";
import { IClientState } from "shared/types/state";

function ProcessInputs(world: World, state: IClientState) {
	const [localentity, moveset, _] = world.query(Moveset, LocalPlayer).next();
	if (localentity === undefined || moveset === undefined) return;

	moveset.forEach((move) => {
		for (const [_] of useGamejoyBind(state.GamejoyContext, state.InputActions[move.keybind])) {
			world.insert(localentity, ...move.effects.map((effect) => table.clone(effect)));
		}
	});
}

export = ProcessInputs;
