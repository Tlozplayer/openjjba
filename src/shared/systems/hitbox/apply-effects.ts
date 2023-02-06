// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Hitbox, Owner } from "shared/components";
import { ApplyEffect, Effect } from "shared/effect";

function ApplyEffects(world: World) {
	for (const [hitbox_entity, hitbox] of world.query(Hitbox)) {
		hitbox.currentHit.forEach((entity) => {
			hitbox.effects.forEach((effect) => ApplyEffect(world, entity, effect));
			world.insert(hitbox_entity, hitbox.patch({ filter: [entity, ...(hitbox.filter || [])] }));
		});
	}
}

export = ApplyEffects;
