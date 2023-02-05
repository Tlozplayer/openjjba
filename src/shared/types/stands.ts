// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReplicatedStorage } from "@rbxts/services";

export type Stand = keyof typeof Stand;
export const Stand = {
	Standless: "Standless",
	ZaShadow: "ZaShadow",
	Instinct: "Instinct",
} as const;

export interface IStand {
	id: Stand;
	extra_data?: Partial<IStandExtraData>;
}

export interface IStandExtraData {}

export type StandModel = Model & {
	root: BasePart;
	head: BasePart;
	torso: BasePart;
	larm: BasePart;
	rarm: BasePart;
	lleg: BasePart;
	rleg: BasePart;
};

export const StandToModel: { [index in Exclude<Stand, "Standless">]: StandModel } = {
	[Stand.ZaShadow]: ReplicatedStorage.assets.stands.ZaShadow,
	[Stand.Instinct]: ReplicatedStorage.assets.stands.ZaShadow,
};

export const StandToName: { [index in Stand]: string } = {
	[Stand.Standless]: "Standless",
	[Stand.ZaShadow]: "Za Shadow",
	[Stand.Instinct]: "Instinct",
};
