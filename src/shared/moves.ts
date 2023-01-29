// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyComponent, Component } from "@rbxts/matter";
import { Cooldown, Dodging, Moveset } from "./components";
import { DefaultKeybinds } from "./default-keybinds";
import { Teleport } from "./systems/moves/teleport";
import { Stand } from "./types/stands";

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
		]),
	],
	[Stand.Instinct]: [Dodging().patch({ frame: -1 })],
};
