// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyComponent, Component } from "@rbxts/matter";
import { Cooldown, Damage, Dodging, Hitbox, Moveset, SpacialHitbox } from "./components";
import { DefaultKeybinds } from "./default-keybinds";
import { Teleport } from "./systems/moves/teleport";
import { Stand } from "./types/stands";
import { Option } from "@rbxts/rust-classes";
import { FrameDataBuilder } from "./types/frame-data";

export interface IMove {
	name: string;
	keybind: keyof typeof DefaultKeybinds;
	effects: Component<{}>[];
}

export const StandComponents: { [index in Stand]: Component<{}>[] } = {
	[Stand.Standless]: [],
	[Stand.ZaShadow]: [
		Moveset([
			{
				name: "Teleport",
				keybind: "Dash",
				effects: [Teleport()],
			},
			{
				name: "TestMove",
				keybind: "Summon",
				effects: [
					Damage({ amount: 5 }),
					Hitbox({
						currentHit: [],
						filter: [],
						frame_data: new FrameDataBuilder<SpacialHitbox>()
							.from(0, 8, {
								type: "Hitbox",
								position: new CFrame(0, 0, -4.5),
								position_type: "Relative",
								size: new Vector3(4, 4, 4),
							})
							.from(20, 60, {
								type: "Radius",
								position: new Vector3(0, 0, 0),
								position_type: "Relative",
								size: 15,
							})
							.last({
								type: "Hitbox",
								position: new CFrame(0, 10, 0),
								position_type: "Global",
								size: new Vector3(3, 3, 3),
							})
							.build(),
					}),
				],
			},
		]),
	],
	[Stand.Instinct]: [Dodging().patch({ frame: -1 })],
};
