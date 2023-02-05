// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Damage, DamageQueue, Hitbox } from "shared/components";

function ApplyDamage(world: World) {
	for (const [, hitbox, damage] of world.query(Hitbox, Damage)) {
		hitbox.currentHit.forEach((entity) => {
			const damageQueue = world.get(entity, DamageQueue);
			if (damageQueue) {
				world.insert(entity, damageQueue.patch({ queue: [...damageQueue.queue, damage.amount] }));
			}
		});
	}
}

export = ApplyDamage;
