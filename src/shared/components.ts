// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, AnyComponent, component } from "@rbxts/matter";
import { Effect } from "./effect";
import { IMove, Move } from "./moves";
import { FrameData } from "./types/frame-data";
import { Item } from "./types/items";

/* Utility */
export const Renderable = component<{ model: Model }>("Renderable");
export const Transform = component<{ cframe: CFrame; _doNotReconcile: boolean }>("Transform");
export const Owner = component<{ owner: AnyEntity }>("Owner");
export const Lifetime = component<{ expiry: number }>("Lifetime");

/* Character */
export const LocalPlayer = component("LocalPlayerComponent");
export const PlayerLike = component("PlayerLike");
export const Health = component<{ health: number }>();
export const Humanoid = component<{ humanoid: Humanoid }>("Humanoid");

/* Effects */

export const DamageQueue = component<{ queue: number[] }>("DamageQueue", { queue: [] });
export const UsingMove = component<{ move: AnyEntity }>("UsingMove");

export const StandRig = component<{ model: Model }>("StandRig");
export const ItemComponent = component<{ id: Item }>("ItemComponent");
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
	filter?: (AnyEntity | Instance)[];
	frame_data: FrameData<SpacialHitbox>;
	effects: Effect[];
}>("Hitbox");

export const CombatTag = component<{
	taggedBy: AnyEntity;
	damageMap: Map<AnyEntity, number>;
}>("CombatTag");

export const Moveset = component<Move[]>("Moveset");
export const Cooldown = component<Map<Move[], number>>("Moveset");

export const Stand = component("stand");
