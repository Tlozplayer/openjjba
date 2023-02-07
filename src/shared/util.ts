// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { RunService } from "@rbxts/services";
import { StandModel } from "./types/stands";

/// https://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another
export function MapNumberRange(input: number, input_range: [number, number], output_range: [number, number]) {
	const slope = (1.0 * (output_range[1] - output_range[0])) / (input_range[1] - input_range[0]);
	return output_range[0] + slope * (input - input_range[0]);
}

export function GetEntityFromPlayer(player: Player): Option<AnyEntity> {
	const id = player.Character?.GetAttribute(RunService.IsServer() ? "id" : "c_id") as AnyEntity;

	if (id === undefined) return Option.none();
	else return Option.some(id);
}

export function ChangeStandTransparency(transparency: number, rig: StandModel) {
	rig.GetDescendants().forEach((instance) => {
		const min = instance.GetAttribute("min_transparency") as number;
		const max = instance.GetAttribute("max_transparency") as number;

		const mapped_transparency = MapNumberRange(
			transparency,
			[0, 1],
			[min !== undefined ? min : 0, max !== undefined ? max : 1],
		);

		if (instance.IsA("BasePart") || instance.IsA("Decal")) {
			instance.Transparency = mapped_transparency;
		}
	});
}

export const IsServer = RunService.IsServer();
export const IsClient = RunService.IsClient();
