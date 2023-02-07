// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { Hitbox, Owner, UsingMove } from "shared/components";
import { ApplyEffect } from "shared/effect";
import Remotes from "shared/remotes";
import { GetEntityFromPlayer } from "shared/util";

const HitEntity = Remotes.Server.Get("HitEntity");
function ProcessHits(world: World) {
	// Apply effects to player owned hitboxes.
	for (const [, player, entity_] of useEvent("HitEntity", HitEntity)) {
		const entity = tonumber(entity_) as AnyEntity;
		if (entity === undefined || !world.contains(entity)) continue;

		GetEntityFromPlayer(player).match(
			(playerEntity) => {
				const usingMove = world.get(playerEntity, UsingMove);
				if (!usingMove) return;

				const hitbox = world.get(usingMove.move, Hitbox);
				if (!hitbox || hitbox.filter?.includes(entity)) return;

				hitbox.effects.forEach((effect) => ApplyEffect(world, entity, effect));
				world.insert(usingMove.move, hitbox.patch({ filter: [entity, ...(hitbox.filter || [])] }));
				print("hi");
			},
			() => {},
		);
	}

	// Apply effects to non-owned hitboxes.
	for (const [hitbox_entity, hitbox] of world.query(Hitbox).without(Owner)) {
		hitbox.currentHit.forEach((entity) => {
			hitbox.effects.forEach((effect) => ApplyEffect(world, entity, effect));
			world.insert(hitbox_entity, hitbox.patch({ filter: [entity, ...(hitbox.filter || [])] }));
		});
	}
}

export = ProcessHits;
