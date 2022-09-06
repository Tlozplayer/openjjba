import Roact from "@rbxts/roact";
import { UserInputService } from "@rbxts/services";
import { Pickup } from "./pickup";

export = (mountpoint: Instance) => {
	const tree = Roact.mount(Pickup(UDim2.fromScale(0.5, 0.5), "Stand Disk"), mountpoint);
	const connection = UserInputService.InputChanged.Connect((i) => {
		if (i.UserInputType === Enum.UserInputType.MouseMovement) {
			Roact.update(tree, Pickup(UDim2.fromOffset(i.Position.X, i.Position.Y), "Stand Disk"));
		}
	});
	return () => {
		Roact.unmount(tree);
		connection.Disconnect();
	};
};
