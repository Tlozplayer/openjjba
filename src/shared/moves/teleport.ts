// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Humanoid, Transform } from "shared/components";
import { Move } from ".";

function TeleportMove(world: World, owner: AnyEntity, { distance }: Move<"Teleport">) {
	const [humanoid, transform] = world.get(owner, Humanoid, Transform);
	const camera = Workspace.CurrentCamera;

	if (!humanoid || !transform || !camera) return;

	const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;
	raycastParams.FilterDescendantsInstances = [humanoid.humanoid.Parent!];

	const direction = (
		humanoid.humanoid.MoveDirection.Magnitude > 0 ? humanoid.humanoid.MoveDirection : transform.cframe.LookVector
	).mul(distance);

	const end_cf = transform.cframe.add(direction);

	const raycastResult = Workspace.Raycast(
		transform.cframe.Position,
		end_cf.Position.sub(transform.cframe.Position),
		raycastParams,
	);

	const cf: CFrame = raycastResult
		? CFrame.lookAt(raycastResult.Position, raycastResult.Position.add(end_cf.LookVector))
		: end_cf;

	world.insert(owner, transform.patch({ cframe: cf, _doNotReconcile: false }));
}

export = TeleportMove;
