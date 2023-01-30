// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useDeltaTime, useThrottle, World } from "@rbxts/matter";
import { Cooldown } from "shared/components";
import { useTimer } from "shared/hooks/use-timer";

function HandleCooldowns(world: World) {
	for (const [id, cooldown] of world.query(Cooldown)) {
		if (cooldown.on_cooldown) {
			if (useTimer(cooldown.cooldown, id)) {
				world.insert(id, cooldown.patch({ on_cooldown: false }));
			}
		}
	}
}

export = HandleCooldowns;
