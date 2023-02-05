// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReplicatedStorage } from "@rbxts/services";
import { IStand } from "./stands";

export type Item = keyof typeof Item;
export const Item = {
	ArrowFragment: "ArrowFragment",
	PocketWatch: "PocketWatch",
	StandDisc: "StandDisc",
	Camera: "Camera",
	Photo: "Photo",
} as const;

export type IItem =
	| { id: typeof Item.StandDisc; stored_stand: IStand }
	| { id: typeof Item.Photo; serialized_photo: string }
	| {
			id: Item;
	  };

export type ItemModel = Model & {
	Handle: BasePart;
};

export const ItemToModel: { [index in Item]: ItemModel } = {
	[Item.ArrowFragment]: ReplicatedStorage.assets.items.Roka,
	[Item.PocketWatch]: ReplicatedStorage.assets.items.PocketWatch,
	[Item.StandDisc]: ReplicatedStorage.assets.items.Disc,
	[Item.Camera]: ReplicatedStorage.assets.items.Disc,
	[Item.Photo]: ReplicatedStorage.assets.items.Disc,
};

export const ItemToName: { [index in Item]: string } = {
	[Item.StandDisc]: "Disc",
	[Item.PocketWatch]: "Pocket Watch",
	[Item.ArrowFragment]: "Arrow\n Fragment",
	[Item.Camera]: "Camera",
	[Item.Photo]: "Photo",
};
