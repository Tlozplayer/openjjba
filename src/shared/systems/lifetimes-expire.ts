// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { Lifetime } from "../components";
import { useTimer } from "../hooks/use-timer";

function LifetimesExpire(world: World) {
	for (const [id, lifetime] of world.query(Lifetime)) {
		if (useTimer(lifetime.expiry, id)) {
			world.despawn(id);
		}
	}
}

export = LifetimesExpire;
