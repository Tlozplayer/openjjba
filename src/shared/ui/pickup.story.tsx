import Roact from "@rbxts/roact";
import { Pickup } from "./pickup";

export = (mountpoint: Instance) => {
	const tree = Roact.mount(Pickup(UDim2.fromScale(0.5, 0.5), "Stand Disk"), mountpoint);
	return () => {
		Roact.unmount(tree);
	};
};
