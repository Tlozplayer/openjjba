import { Spring } from "@rbxts/flipper";
import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { LocalPlayerComponent, Renderable, Targeted } from "shared/components";
import { useGroupMotor, useMotor } from "shared/hooks/useMotor";

function CameraFollowsTarget(world: World) {
	const camera = Workspace.CurrentCamera;
	if (!camera) return;

	for (const [_, playerChar] of world.query(Renderable, LocalPlayerComponent)) {
		const playerCharhrp = playerChar.model.FindFirstChild("HumanoidRootPart");
		const playerCharHumanoid = playerChar.model.FindFirstChild("Humanoid");

		if (playerCharhrp === undefined || !playerCharhrp?.IsA("BasePart")) return;
		if (playerCharHumanoid === undefined || !playerCharHumanoid?.IsA("Humanoid")) return;

		const [_, targetedChar] = world.query(Renderable, Targeted).next();
		if (!targetedChar) {
			playerCharHumanoid.AutoRotate = true;
			return;
		} else {
			playerCharHumanoid.AutoRotate = false;
		}

		if (targetedChar.model.PrimaryPart === undefined) return;

		const charCFrame = playerCharhrp.CFrame;
		const targetCharPosition = targetedChar.model.PrimaryPart.Position;

		const distance = targetCharPosition.sub(charCFrame.Position).Magnitude;
		const springedCameraOffset = useMotor(new Spring(distance > 30 ? 8 : 15, { frequency: 0.5 }), 8);
		const lookAtPostition = useGroupMotor(
			[
				new Spring(targetCharPosition.X, { frequency: 0.5 }),
				new Spring(targetCharPosition.Y, { frequency: 0.5 }),
				new Spring(targetCharPosition.Z, { frequency: 0.5 }),
			],
			[targetCharPosition.X, targetCharPosition.Y, targetCharPosition.Z],
		);

		camera.CFrame = CFrame.lookAt(
			charCFrame.mul(new CFrame(springedCameraOffset, 3, springedCameraOffset / 2)).Position,
			new Vector3(lookAtPostition[0], lookAtPostition[1], lookAtPostition[2]),
		);

		playerCharhrp.CFrame = CFrame.lookAt(
			charCFrame.Position,
			new Vector3(targetCharPosition.X, charCFrame.Y, targetCharPosition.Z),
		);
	}
}

export = { system: CameraFollowsTarget, event: "render" };
