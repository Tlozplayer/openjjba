// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, Entity, World } from "@rbxts/matter";
import { RunService, Workspace } from "@rbxts/services";
import { StatefulZirconValidator } from "@rbxts/zircon/out/Class/StatefulZirconValidator";
import { Hitbox, Owner, Renderable, SpacialHitbox } from "shared/components";
import { useFrameData } from "shared/hooks/use-frame-data";
import { FrameData } from "shared/types/frame-data";

export function GetHitboxPosition(world: World, hitbox_id: AnyEntity, frame: SpacialHitbox) {
	const position = frame.position;

	if (frame.position_type === "Relative") {
		const owner = world.get(hitbox_id, Owner);
		if (!owner) {
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
	}
}

function HitboxesCollide(world: World) {
	for (const [id, hitbox] of world.query(Hitbox)) {
		const frame_option = useFrameData(hitbox.frame_data, id);
		if (frame_option) {
			const frame = frame_option;
			const position = GetHitboxPosition(world, id, frame)!;

			const overlapParams = new OverlapParams();
			overlapParams.FilterType = Enum.RaycastFilterType.Blacklist;

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
