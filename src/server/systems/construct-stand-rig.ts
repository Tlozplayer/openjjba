// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { PlayerData, Renderable, StandRig } from "shared/components";
import { Stand, StandToModel } from "shared/types/stands";

function CreateStandRig(character: Model, stand_model: Model) {
	const model = stand_model.Clone();
	if (character.FindFirstChild("StandMotor")) {
		character.FindFirstChild("StandMotor")!.Destroy();
	}

	const motor = new Instance("Motor6D");
	motor.Part0 = character.WaitForChild("HumanoidRootPart")! as BasePart;
	motor.Part1 = model.WaitForChild("root")! as BasePart;
	motor.Parent = character;
	motor.Name = "StandMotor";

	model.GetDescendants().forEach((instance) => {
		if (instance.IsA("BasePart")) {
			instance.SetAttribute("OriginalTransparency", instance.Transparency);
			instance.Transparency = 1;
		}
	});

	model.Parent = character;

	return model;
}

function ConstructStandRig(world: World) {
	for (const [id, character, data] of world.query(Renderable, PlayerData).without(StandRig)) {
		if (data.stand.id === Stand.Standless) {
			return;
		}

		const model = CreateStandRig(character.model, StandToModel[data.stand.id]);
		world.insert(id, StandRig({ model: model }));
	}

	for (const [id, data] of world.queryChanged(PlayerData)) {
		if (data.old?.stand.id === data.new?.stand.id) {
			return;
		}

		if (data.new?.stand.id === Stand.Standless) {
			world.remove(id, StandRig);
			return;
		}

		if (!data.new) {
			return;
		}

		const character = world.get(id, Renderable);
		if (character) {
			CreateStandRig(character.model, StandToModel[data.new.stand.id]);
		}
	}

	for (const [id] of world.query(StandRig).without(Renderable)) {
		world.remove(id, StandRig);
	}
}

export = ConstructStandRig;
