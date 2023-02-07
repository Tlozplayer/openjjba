// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Hitbox } from "shared/components";
import { ApplyEffect } from "shared/effect";
import Remotes from "shared/remotes";
import { IClientState } from "shared/types/state";

const HitEntity = Remotes.Client.Get("HitEntity");
function SendHitEntity(world: World, state: IClientState) {
	for (const [hitbox_entity, hitbox] of world.query(Hitbox)) {
		hitbox.currentHit.forEach((entity) => {
			hitbox.effects.forEach((effect) => ApplyEffect(world, entity, effect));

			const serverId = state.serverIdMap.get(entity);
			if (serverId !== undefined) {
				HitEntity.SendToServer(serverId);
			}

			world.insert(hitbox_entity, hitbox.patch({ filter: [entity, ...(hitbox.filter || [])] }));
		});
	}
}

export = SendHitEntity;
