// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import variantModule, { fields, match, TypeNames, VariantOf } from "@rbxts/variant";
import {
	CombatTag,
	Dodging,
	Hitbox,
	Lifetime,
	Moveset,
	Owner,
	Renderable,
	SpacialHitbox,
	StandRig,
} from "shared/components";
import { DefaultKeybinds } from "shared/default-keybinds";
import { Stand } from "shared/types/stands";
import TeleportMove from "./teleport";
import { Component } from "@rbxts/matter";
import { Frame, FrameDataBuilder } from "shared/types/frame-data";
import { Effect } from "shared/effect";
import { Identity } from "@rbxts/variant/out/types";
import { RunService } from "@rbxts/services";
import { ChangeStandTransparency } from "shared/util";

function move<T>(defaults: T & BaseMove): (overrides?: Partial<T & BaseMove>) => Identity<T & BaseMove> {
	return (overrides?: Partial<T & BaseMove>) => {
		return {
			...defaults,
			...(overrides || {}),
		} as Identity<T & BaseMove>;
	};
}

export type BaseMove = { name: string; description: string; keybind: keyof typeof DefaultKeybinds; cooldown: number };
export type Move<T extends TypeNames<typeof Move> = undefined> = VariantOf<typeof Move, T>;
export const Move = variantModule({
	Teleport: move({
		name: "Teleport",
		description: "A small time distortion, moving you forward in space.",
		keybind: "Dash",
		cooldown: 0,
		distance: 5,
	}),
	Jab: move({
		name: "Jab",
		description: "",
		keybind: "Summon",
		cooldown: 0.0,
		damage: 10,
	}),
	Summon: move({
		name: "Summon",
		description: "Summon your stand's power",
		keybind: "Summon",
		cooldown: 1,
	}),
});

export const UseMove = (world: World, owner: AnyEntity, move: Move) =>
	match(move, {
		Teleport: (move) => TeleportMove(world, owner, move),
		Summon: (move) => {
			const stand = world.get(owner, StandRig);
			if (stand) {
				if (RunService.IsServer()) {
					task.delay(1, () => ChangeStandTransparency(0, stand.model));
				} else {
					task.defer(() => {
						let elapsed = 1;
						while (elapsed >= 0) {
							ChangeStandTransparency(elapsed, stand.model);
							elapsed -= RunService.RenderStepped.Wait()[0];
						}
					});
				}

				return world.spawn(Lifetime({ expiry: 1 }));
			}
		},
		Jab: ({ damage }) =>
			world.spawn(
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
			),
	});

export interface IMove {
	name: string;
	keybind: keyof typeof DefaultKeybinds;
	effects: Component<{}>[];
}

export const StandComponents: { [index in Stand]: Component<{}>[] } = {
	[Stand.Standless]: [],
	[Stand.ZaShadow]: [Moveset([Move.Jab()])],
	[Stand.Kinesthesia]: [Dodging({ frame: -1 }), Moveset([Move.Jab(), Move.Teleport()])],
};
