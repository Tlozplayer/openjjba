// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import variantModule, { fields, match, TypeNames, VariantOf } from "@rbxts/variant";
import { DamageQueue } from "shared/components";

export type Effect<T extends TypeNames<typeof Effect> = undefined> = VariantOf<typeof Effect, T>;
export const Effect = variantModule({
	Damage: fields<{ amount: number }>(),
	Poison: fields<{ damage: number; tick_rate: number }>(),
});

export const ApplyEffect = (world: World, target: AnyEntity, effect: Effect) =>
	match(effect, {
		Damage: ({ amount }) => {
			const damageQueue = world.get(target, DamageQueue);
			if (damageQueue) {
				world.insert(target, damageQueue.patch({ queue: [amount, ...damageQueue.queue] }));
			}
		},
		Poison: ({ damage, tick_rate }) => {},
	});
