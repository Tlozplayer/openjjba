import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { UserInputService } from "@rbxts/services";
import { CreateUIStore } from "shared/rodux/ui-store";
import { UpdatePickupUI } from "shared/rodux/ui-store/pickup-reducer";
import Pickup from "./pickup";

export = (mountpoint: Instance) => {
	const store = CreateUIStore();
	const tree = Roact.mount(
		<StoreProvider store={store}>
			<Pickup />
		</StoreProvider>,
		mountpoint,
	);
	const connection = UserInputService.InputChanged.Connect((i) => {
		if (i.UserInputType === Enum.UserInputType.MouseMovement) {
			store.dispatch(
				UpdatePickupUI({
					MousePosition: UDim2.fromOffset(i.Position.X, i.Position.Y),
					HoveredName: "Stand Disk",
				}),
			);
		}
	});
	return () => {
		Roact.unmount(tree);
		connection.Disconnect();
	};
};
