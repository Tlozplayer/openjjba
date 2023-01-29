// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReplicatedStorage } from "@rbxts/services";

export const enum Stand {
	Standless,
	ZaShadow,
	Instinct,
}

export const enum Spec {
	Specless,
	Vampire,
	Hamon,
	Spin,
}

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

export const StandToModel: { [index in Exclude<Stand, Stand.Standless>]: StandModel } = {
	[Stand.ZaShadow]: ReplicatedStorage.assets.stands.ZaShadow,
	[Stand.Instinct]: ReplicatedStorage.assets.stands.ZaShadow,
};

export const StandToName: { [index in Stand]: string } = {
	[Stand.Standless]: "Standless",
	[Stand.ZaShadow]: "Za Shadow",
	[Stand.Instinct]: "Instinct",
};
