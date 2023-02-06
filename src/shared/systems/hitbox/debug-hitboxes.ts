// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import Plasma from "@rbxts/plasma";
import { RunService, Workspace } from "@rbxts/services";
import { Hitbox, SpacialHitbox } from "shared/components";
import { useFrameData } from "shared/hooks/use-frame-data";
import { IClientState } from "shared/types/state";
import { GetHitboxPosition } from "./hitboxes-collide";

const HitboxWidget = Plasma.widget((world: World, id: AnyEntity, frame: SpacialHitbox) => {
	const position = GetHitboxPosition(world, id, frame)!;

	Plasma.portal(Workspace, () => {
		const ref = Plasma.useInstance((_ref) => {
			const ref = _ref as unknown as { [index: string]: Instance };
			ref["Part"] = Plasma.create("Part", {
				Anchored: true,
				CanCollide: false,
				Material: Enum.Material.ForceField,
				Color: Color3.fromHex("#FC2769"),
			});
			return ref["Part"];
		});

		const part = ref["Part"] as Part;
		part.CFrame = frame.type === "Radius" ? new CFrame(position as Vector3) : (position as CFrame);
		part.Size = frame.type === "Radius" ? new Vector3(frame.size, frame.size, frame.size) : frame.size;
		part.Shape = frame.type === "Radius" ? Enum.PartType.Ball : Enum.PartType.Block;
	});
});

function DebugHitboxes(world: World, state: IClientState) {
	for (const [id, hitbox] of world.query(Hitbox)) {
		const frame = useFrameData(hitbox.frame_data, id);
		if (!state.debugEnabled || frame.isNone()) continue;
		HitboxWidget(world, id, frame.unwrap());
	}
}

export = DebugHitboxes;
