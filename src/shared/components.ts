// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, component } from "@rbxts/matter";
import { IMove } from "./moves";
import { FrameData } from "./types/frame-data";
import { Item } from "./types/items";

export const Renderable = component<{ model: Model }>("Renderable");
export const Transform = component<{ cframe: CFrame; _doNotReconcile: boolean }>("Transform");
export const Owner = component<{ owner: AnyEntity }>("Owner");
export const Lifetime = component<{ expiry: number }>("Lifetime");

export const LocalPlayer = component("LocalPlayerComponent");
export const PlayerLike = component("PlayerLike");
export const Health = component<{ health: number }>();
export const Humanoid = component<{ humanoid: Humanoid }>("Humanoid");

export const Damage = component<{ amount: number }>();
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
}>("Hitbox");

export const CombatTag = component<{
	taggedBy: AnyEntity;
	damageMap: Map<AnyEntity, number>;
}>("CombatTag");

export const Moveset = component<IMove[]>("Moveset");
export const Cooldown = component<{ on_cooldown: boolean; cooldown: number }>("Cooldown", {
	on_cooldown: false,
	cooldown: 0,
});
export const Stand = component("stand");
