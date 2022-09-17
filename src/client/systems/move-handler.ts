// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { StandMoves } from "shared/combat/stand-moves";
import { LocalPlayerComponent, MovesComponent, PlayerData, Renderable, StandRig } from "shared/components";
import Remotes from "shared/remotes";

const MoveCooldownEnded = Remotes.Client.Get("MoveCooldownEnded");
const UseMove = Remotes.Client.Get("UseMove");

function MoveHandler(world: World) {
	// Reconcile Missing or Changed Moves

	for (const [id, data] of world.query(PlayerData, LocalPlayerComponent).without(MovesComponent)) {
		const moves = StandMoves[data.stand.id];
		world.insert(id, MovesComponent({ moves }));
	}

	for (const [id, data] of world.queryChanged(PlayerData)) {
		const localplayerComponent = world.get(id, LocalPlayerComponent);
		if (localplayerComponent === undefined) continue;
		if (data.new?.stand === data.old?.stand || data.new?.spec === data.old?.spec) break;
		if (data.new === undefined) continue;

		const moves = StandMoves[data.new.stand.id];
		world.insert(id, MovesComponent({ moves }));
	}

	// Handle move inputs

	for (const [_, inputEvent] of useEvent(UserInputService, "InputBegan")) {
		for (const [id, char, moves] of world.query(Renderable, MovesComponent)) {
			moves.moves.forEach((mv, i) => {
				if (mv.keybind === inputEvent.KeyCode && mv.onCooldown === false) {
					mv.onClient(world);
					mv.onCooldown = true;

					UseMove.SendToServer(i);
				}
			});
		}
	}

	// Handle move cooldowns

	for (const [_, move] of useEvent("MoveCooldownEnded", MoveCooldownEnded)) {
		for (const [id, moves] of world.query(MovesComponent)) {
			moves.moves[move].onCooldown = false;
		}
	}
}

export = MoveHandler;
