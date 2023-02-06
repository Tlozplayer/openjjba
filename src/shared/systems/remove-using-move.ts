// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { UsingMove } from "shared/components";

function RemoveUsingMove(world: World) {
	for (const [id, move] of world.query(UsingMove)) {
		if (!world.contains(move.move)) {
			world.remove(id, UsingMove);
		}
	}
}

export = RemoveUsingMove;
