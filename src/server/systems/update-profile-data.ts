// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { PlayerProfiles } from "server/plugins/load-player-data";
import { PlayerComponent, PlayerData } from "shared/components";

function UpdateProfileData(world: World) {
	for (const [id, newData] of world.queryChanged(PlayerData)) {
		if (!newData.new) {
			return;
		}

		const playerComponent = world.get(id, PlayerComponent);
		if (!playerComponent) {
			return;
		}

		const profile = PlayerProfiles.get(playerComponent.player);
		if (!profile) {
			return;
		}

		profile.Data = newData.new;
	}
}

export = UpdateProfileData;
