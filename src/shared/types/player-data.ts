// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { IItem, Item } from "./items";
import { IStand, Stand } from "./stands";

interface IBanData {
	reason: string;
	unban_date: number;

	ban_history: Omit<IBanData, "ban_history">[];
}

export interface IPlayerData {
	stand: IStand;

	inventory: IItem[];

	playtime: number;
	join_date: number;

	ban_data: IBanData;
}

export const DefaultPlayerData: IPlayerData = {
	stand: {
		id: Stand.Kinesthesia,
	},

	inventory: [
		{
			id: Item.StandDisc,
			stored_stand: {
				id: Stand.Standless,
			},
		},
	],

	playtime: 0,
	join_date: 0,
	ban_data: {
		reason: "",
		unban_date: 0,
		ban_history: [],
	},
};
