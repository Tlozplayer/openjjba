// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { component, World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Owner, Renderable } from "shared/components";

type TeleportProps = {
	distance: number;
};

export const Teleport = component<TeleportProps>("Teleport", {
	distance: 15,
});

function TeleportSystem(world: World) {
	for (const [id, props, owner] of world.query(Teleport, Owner)) {
		const character = world.get(owner.owner, Renderable);
		if (!character) return;

		const humanoid = character.model.FindFirstChildOfClass("Humanoid");
		const humanoidRootPart = humanoid?.RootPart;
		const camera = Workspace.CurrentCamera;

		if (!humanoid || !humanoidRootPart || !camera) continue;

		const cameraLookDirection = camera.CFrame.LookVector.mul(new Vector3(1, 0, 1)).Unit;
		const cameraRelativeCFrame = CFrame.lookAt(Vector3.zero, cameraLookDirection);
		const moveVector = cameraRelativeCFrame.VectorToObjectSpace(humanoid.MoveDirection).Unit.mul(props.distance);

		const raycastParams = new RaycastParams();
		raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;
		raycastParams.FilterDescendantsInstances = [character.model];

		const direction = (
			humanoid.MoveDirection.Magnitude > 0 ? humanoid.MoveDirection : humanoidRootPart.CFrame.LookVector
		).mul(props.distance);

		const raycastResult = Workspace.Raycast(
			humanoidRootPart.Position,
			humanoidRootPart.CFrame.LookVector.add(moveVector),
			raycastParams,
		);

		let cf = humanoidRootPart.CFrame.add(direction);
		if (raycastResult) {
			cf = CFrame.lookAt(raycastResult.Position, raycastResult.Position.add(humanoidRootPart.CFrame.LookVector));
		}

		humanoidRootPart.CFrame = cf;

		world.remove(id, Teleport);
	}
}

export const system = TeleportSystem;
