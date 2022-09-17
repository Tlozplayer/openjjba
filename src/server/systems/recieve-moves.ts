// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useEvent, World } from "@rbxts/matter";
import { t } from "@rbxts/t";
import { Moves } from "shared/combat/moves";
import { StandMoves } from "shared/combat/stand-moves";
import Remotes from "shared/remotes";
import { Stand } from "shared/types/stands";

const UseMove = Remotes.Server.Get("UseMove");
const RecieveMove = Remotes.Server.Get("RecieveMove");
const MoveCooldownEnded = Remotes.Server.Get("MoveCooldownEnded");

function RecieveMoves(world: World) {
	for (const [_, player, move] of useEvent("UseMove", UseMove)) {
		const moveData = StandMoves[Stand.ZaShadow][move];
		moveData.onServer(world);

		task.delay(moveData.cooldown, () => {
			MoveCooldownEnded.SendToPlayer(player, move);
		});
	}
}

export = RecieveMoves;
