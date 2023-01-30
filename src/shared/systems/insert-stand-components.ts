// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { LocalPlayer, Stand } from "shared/components";
import { useChanged } from "shared/hooks/use-changed";
import { StandComponents } from "shared/moves";
import { DataRoduxStore } from "shared/rodux/data-store";
import { IClientState, IServerState } from "shared/types/state";

function InsertStandComponents(world: World, state: IClientState | IServerState) {
	function update(id: AnyEntity, data: DataRoduxStore) {
		const [newStand, oldStand] = useChanged(data.getState().stand, id);
		if (newStand && (newStand.id !== oldStand?.id || world.get(id, Stand) === undefined)) {
			world.insert(id, Stand(), ...StandComponents[newStand.id].map((component) => table.clone(component)));
		}
	}

	if (RunService.IsServer()) {
		(state as IServerState).PlayerData.forEach((data, player) => {
			const id = player.Character?.GetAttribute("id");
			if (t.number(id)) {
				update(id as AnyEntity, data);
			}
		});
	} else {
		const [id] = world.query(LocalPlayer).next();
		if (id !== undefined) {
			update(id, (state as IClientState).PlayerData);
		}
	}
}

export = InsertStandComponents;
