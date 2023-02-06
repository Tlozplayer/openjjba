// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReplicatedStorage } from "@rbxts/services";

export type Stand = keyof typeof Stand;
export const Stand = {
	Standless: "Standless",
	ZaShadow: "ZaShadow",
	Kinesthesia: "Kinesthesia",
} as const;

export type IStand =
	| { id: typeof Stand.ZaShadow; mode: "Time" | "Erasure" }
	| {
			id: Stand;
	  };

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
	[Stand.Kinesthesia]: ReplicatedStorage.assets.stands.ZaShadow,
};

export const StandToName: { [index in Stand]: string } = {
	[Stand.Standless]: "Standless",
	[Stand.ZaShadow]: "Za Shadow",
	[Stand.Kinesthesia]: "Kinesthesia",
};
