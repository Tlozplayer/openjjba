// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyComponent, Component } from "@rbxts/matter";
import { Cooldown, Dodging, Hitbox, Moveset, SpacialHitbox } from "./components";
import { DefaultKeybinds } from "./default-keybinds";
import { Teleport } from "./systems/moves/teleport";
import { Stand } from "./types/stands";
import { Option } from "@rbxts/rust-classes";

export interface IMove {
	name: string;
	keybind: keyof typeof DefaultKeybinds;
	effects: Component<{}>[];
}

export function Frame(seconds: number) {
	return seconds / 60;
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
				keybind: "Click",
				effects: [
					Hitbox({
						currentHit: [],
						filter: [],
						frame_data: [
							[
								Frame(1),
								{
									type: "Hitbox",
									position_type: "Relative",
									position: new CFrame(0, -2, 0),
									size: new Vector3(3, 1, 3),
								},
							],
						],
					}),
				],
			},
		]),
	],
	[Stand.Instinct]: [Dodging().patch({ frame: -1 })],
};
