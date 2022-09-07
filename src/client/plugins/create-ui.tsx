import { World } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { Players } from "@rbxts/services";
import LockOn from "shared/ui/lock-on";
import { IClientState } from "shared/types/state";
import Pickup from "shared/ui/pickup";

export function CreateUI(_world: World, state: IClientState) {
	Roact.mount(
		<StoreProvider store={state.UIStore}>
			<Pickup />
			<LockOn />
		</StoreProvider>,
		Players.LocalPlayer.FindFirstChild("PlayerGui"),
	);
}
