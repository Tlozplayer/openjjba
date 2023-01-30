// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReplicatedStorage } from "@rbxts/services";
import { IStand } from "./stands";

export type Item = keyof typeof Item;
export const Item = {
	ArrowFragment: "ArrowFragment",
	Arrow: "Arrow",
	StandDisc: "StandDisc",
} as const;

export interface IItem {
	id: Item;
	extra_data?: Partial<IExtraItemData>;
}

export interface IExtraItemData {
	/// StandDisc
	stored_stand: IStand;
}

export type ItemModel = Model & {
	Handle: BasePart;
};

export const ItemToModel: { [index in Item]: ItemModel } = {
	[Item.ArrowFragment]: ReplicatedStorage.assets.items.Roka,
	[Item.Arrow]: ReplicatedStorage.assets.items.PocketWatch,
	[Item.StandDisc]: ReplicatedStorage.assets.items.Disc,
};
