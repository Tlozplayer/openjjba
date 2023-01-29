// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import Plasma from "@rbxts/plasma";
import { RunService } from "@rbxts/services";
import { Hitbox } from "shared/components";
import { IClientState } from "shared/types/state";

const HitboxWidget = Plasma.widget((hitbox: ReturnType<typeof Hitbox>) => {
	const refs = Plasma.useInstance((ref) => {
		return Plasma.create("Part", {
			Size: hitbox.type === "Radius" ? new Vector3(hitbox.size, hitbox.size, hitbox.size) : hitbox.size,
			CFrame: hitbox.type === "Radius" ? new CFrame(hitbox.position) : hitbox.position,
			Shape: hitbox.type === "Radius" ? Enum.PartType.Ball : Enum.PartType.Block,
			Anchored: true,
			CanCollide: false,
		});
	});
});

function DebugHitboxes(world: World, state: IClientState) {
	if (!state.debugEnabled) return;
	for (const [, hitbox] of world.query(Hitbox)) {
		HitboxWidget(hitbox);
	}
}

export = DebugHitboxes;
