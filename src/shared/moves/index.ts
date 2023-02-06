// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import variantModule, { fields, match, TypeNames, VariantOf } from "@rbxts/variant";
import { Dodging, Hitbox, Lifetime, Moveset, Owner, SpacialHitbox } from "shared/components";
import { DefaultKeybinds } from "shared/default-keybinds";
import { Stand } from "shared/types/stands";
import TeleportMove from "./teleport";
import { Component } from "@rbxts/matter";
import { Frame, FrameDataBuilder } from "shared/types/frame-data";
import { Effect } from "shared/effect";

export type BaseMove = { name: string; description: string; keybind: keyof typeof DefaultKeybinds; cooldown: number };
export type Move<T extends TypeNames<typeof Move> = undefined> = VariantOf<typeof Move, T>;
export const Move = variantModule({
	Teleport: fields<BaseMove & { distance: number }>({
		name: "Teleport",
		description: "A small time distortion, moving you forward in space.",
		keybind: "Dash",
		cooldown: 0,
		distance: 5,
	}),
	Jab: fields<BaseMove & { damage: number }>({
		name: "Jab",
		description: "",
		keybind: "Jab",
		cooldown: 0.0,
		damage: 10,
	}),
});

export const UseMove = (world: World, owner: AnyEntity, move: Move) =>
	match(move, {
		Teleport: (move) => TeleportMove(world, owner, move),
		Jab: ({ damage }) => {
			return world.spawn(
				Owner({ owner }),
				Lifetime({ expiry: Frame(17) }),
				Hitbox({
					currentHit: [],
					filter: [],
					effects: [Effect.Damage({ amount: damage })],
					frame_data: new FrameDataBuilder<SpacialHitbox>()
						.from(2, 5, {
							type: "Hitbox",
							position_type: "Relative",
							position: new CFrame(0, 0, -4),
							size: new Vector3(2, 4, 2),
						})
						.build(),
				}),
			);
		},
	});

export interface IMove {
	name: string;
	keybind: keyof typeof DefaultKeybinds;
	effects: Component<{}>[];
}

export const StandComponents: { [index in Stand]: Component<{}>[] } = {
	[Stand.Standless]: [],
	[Stand.ZaShadow]: [],
	[Stand.Kinesthesia]: [Dodging({ frame: -1 }), Moveset([Move.Jab({ damage: 15 }), Move.Teleport({ distance: 10 })])],
};
