// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, Entity, World } from "@rbxts/matter";
import { RunService, Workspace } from "@rbxts/services";
import { Hitbox, Owner, Renderable, SpacialHitbox } from "shared/components";
import { useFrameData } from "shared/hooks/use-frame-data";
import { FrameData } from "shared/types/frame-data";

export function GetHitboxPosition(world: World, hitbox_id: AnyEntity, frame: SpacialHitbox) {
	const position = frame.position;

	if (frame.position_type === "Relative") {
		const owner = world.get(hitbox_id, Owner);
		if (owner === undefined) {
			warn('Frame position type "Relative", but has no owner!');
			return;
		}

		const model = world.get(owner.owner, Renderable);
		if (!model) {
			warn(`Frame position type "Relative", but owner has no model!`);
			return;
		}

		if (frame.type === "Radius") {
			return model.model.PrimaryPart!.Position.add(position as Vector3);
		} else {
			return model.model.PrimaryPart!.CFrame.mul(position as CFrame);
		}
	} else {
		return position;
	}
}

function GetFilteredInstances(world: World, id: AnyEntity, extra_filtered?: (Instance | AnyEntity)[]) {
	const instances: Instance[] = [];
	if (extra_filtered) {
		extra_filtered.forEach((entity) => {
			if (typeIs(entity, "Instance")) {
				instances.push(entity);
			} else if (typeIs(entity, "number")) {
				const model = world.get(entity, Renderable);
				if (model) {
					instances.push(model.model);
				}
			}
		});
	}

	const owner = world.get(id, Owner);
	if (owner !== undefined) {
		const model = world.get(owner.owner, Renderable);
		if (model !== undefined) {
			instances.push(model.model);
		}
	}

	return instances;
}

function HitboxesCollide(world: World) {
	for (const [id, hitbox] of world.query(Hitbox)) {
		const frame_option = useFrameData(hitbox.frame_data, id);
		if (frame_option.isSome()) {
			const frame = frame_option.unwrap();
			const position = GetHitboxPosition(world, id, frame);

			const overlapParams = new OverlapParams();
			overlapParams.FilterType = Enum.RaycastFilterType.Blacklist;
			overlapParams.FilterDescendantsInstances = GetFilteredInstances(world, id, hitbox.filter);

			const result =
				frame.type === "Radius"
					? Workspace.GetPartBoundsInRadius(position as Vector3, frame.size, overlapParams)
					: Workspace.GetPartBoundsInBox(position as CFrame, frame.size, overlapParams);

			const models: AnyEntity[] = [];
			result.forEach((v) => {
				const model = v.FindFirstAncestorOfClass("Model");

				if (model && model.FindFirstChildOfClass("Humanoid")) {
					const id = model.GetAttribute(RunService.IsServer() ? "id" : "c_id") as AnyEntity | undefined;
					if (id !== undefined && !models.includes(id)) {
						models.push(id);
					}
				}
			});

			world.insert(
				id,
				hitbox.patch({
					currentHit: models,
				}),
			);
		}
	}
}

export const system = HitboxesCollide;
