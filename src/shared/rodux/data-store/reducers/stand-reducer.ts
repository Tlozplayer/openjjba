// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Rodux from "@rbxts/rodux";
import { IPlayerData } from "shared/types/player-data";
import { IStand, Stand } from "shared/types/stands";

export interface SetStandAction extends Rodux.Action<"SetStandAction"> {
	stand: IStand;
}

export interface ClearStandAction extends Rodux.Action<"ClearStandAction"> {}

export type StandActions = SetStandAction | ClearStandAction;

export const StandReducer = Rodux.createReducer<IPlayerData["stand"], StandActions>(
	{
		id: Stand.Standless,
	},
	{
		SetStandAction: (_state, action) => {
			return action.stand;
		},

		ClearStandAction: () => {
			return {
				id: Stand.Standless,
			};
		},
	},
);
