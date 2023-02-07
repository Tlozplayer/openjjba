// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { RunService } from "@rbxts/services";
import { LocalPlayer, Renderable, StandRig } from "shared/components";
import { useChanged } from "shared/hooks/use-changed";
import { StandComponents } from "shared/moves";
import { DataRoduxStore } from "shared/rodux/data-store";
import { Stand, StandModel, StandToModel } from "shared/types/stands";
import { IClientState, IServerState } from "shared/types/state";
import { ChangeStandTransparency, GetEntityFromPlayer } from "shared/util";

function BuildStandRig(stand: Stand, attachTo: BasePart): Option<StandModel> {
	if (stand === "Standless") return Option.none();

	const model = StandToModel[stand].Clone();

	const motor = new Instance("Motor6D");
	motor.Part0 = attachTo;
	motor.Part1 = model.root;
	motor.Parent = model.root;

	model.Name = "StandRig";

	return Option.some(model);
}

function InsertStandComponents(world: World, state: IClientState | IServerState) {
	function update(id: AnyEntity, data: DataRoduxStore) {
		const [newStand, oldStand] = useChanged(data.getState().stand, id);
		const character = world.get(id, Renderable);

		if (character && newStand && (newStand.id !== oldStand?.id || world.get(id, StandRig) === undefined)) {
			let rig;

			if (RunService.IsServer() && character.model.PrimaryPart) {
				const StandRig = BuildStandRig(newStand.id, character.model.PrimaryPart);
				StandRig.match(
					(model) => {
						ChangeStandTransparency(1, model);
						model.Parent = character.model;

						rig = model;
					},
					() => {},
				);
			}

			// FIXME: This will break at runtime if the model isn't constructed in time for whatever reason
			world.insert(
				id,
				StandRig({ model: rig || (character.model.FindFirstChild("StandRig") as StandModel) }),
				...StandComponents[newStand.id].map((component) => table.clone(component)),
			);
		}
	}

	if (RunService.IsServer()) {
		(state as IServerState).PlayerData.forEach((data, player) =>
			GetEntityFromPlayer(player).match(
				(id) => update(id, data),
				() => {},
			),
		);
	} else {
		const [id] = world.query(LocalPlayer).next();
		if (id !== undefined) {
			update(id, (state as IClientState).PlayerData);
		}
	}
}

export = InsertStandComponents;
