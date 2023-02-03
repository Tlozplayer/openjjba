// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyComponent, AnyEntity, Component, component } from "@rbxts/matter";
import { IMove } from "./moves";
import { FrameData } from "./types/frame-data";
import { Item } from "./types/items";
import { Option } from "@rbxts/rust-classes";

export const LocalPlayer = component("LocalPlayerComponent");
export const PlayerLike = component("PlayerLike");
export const Health = component<{ health: number }>();

export const StandRig = component<{ model: Model }>("StandRig");
export const ItemComponent = component<{ id: Item }>("ItemComponent");
export const Renderable = component<{ model: Model }>("Renderable");
export const Targetable = component("Targetable");
export const Targeted = component<{}>("Targeted");

export const Blocking = component<{ frame: number }>("Blocking", {
	frame: 0,
});

export const Dodging = component<{ frame: number }>("Dodging", {
	frame: 0,
});

export const Hovered = component("Hovered");

export type SpacialHitbox =
	| (
			| {
					type: "Radius";
					position: Vector3;
					size: number;
			  }
			| {
					type: "Hitbox";
					position: CFrame;
					size: Vector3;
			  }
	  ) & {
			position_type: "Relative" | "Global";
	  };

export const Hitbox = component<{
	currentHit: AnyEntity[];
	filter: (AnyEntity | Instance)[];
	frame_data: FrameData<SpacialHitbox>;
}>("Hitbox");

export const CombatTag = component<{
	taggedBy: AnyEntity;
	damageMap: Map<AnyEntity, number>;
}>("CombatTag");

export const DamageRequest = component<{ damage: number; owner: AnyEntity; target: AnyEntity }>("DamageRequest");
export const Moveset = component<IMove[]>("Moveset");
export const Cooldown = component<{ on_cooldown: boolean; cooldown: number }>("Cooldown", {
	on_cooldown: false,
	cooldown: 0,
});
export const Stand = component("stand");
export const Owner = component<{ owner: AnyEntity }>("Owner");
