import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { ItemComponent, LocalPlayerComponent, Renderable } from "shared/components";
import Remotes from "shared/remotes";
import { IClientState } from "shared/types/state";

const PickupItem = Remotes.Client.Get("PickupItem");

let cachedResult: Instance | undefined = undefined;
function PickUpItems(world: World, state: IClientState) {
	for (const [_, character, localplayer] of world.query(Renderable, LocalPlayerComponent)) {
		for (const [itemId, item_model, _item] of world.query(Renderable, ItemComponent)) {
			if (!item_model.model.PrimaryPart || !character.model.PrimaryPart) {
				return;
			}

			if (cachedResult === undefined) {
				const origin = Workspace.CurrentCamera!.CFrame;
				const direction = localplayer.localplayer.GetMouse().Hit;

				const rayParams = new RaycastParams();
				rayParams.FilterType = Enum.RaycastFilterType.Blacklist;
				rayParams.FilterDescendantsInstances = [character.model];

				cachedResult = Workspace.Raycast(origin.Position, origin.LookVector.mul(15), rayParams)?.Instance;
				if (cachedResult === undefined) return;
			}

			print(cachedResult);

			if (cachedResult.IsDescendantOf(item_model.model)) {
				const serverId = state.serverIdMap.get(itemId);
				if (serverId === undefined) {
					print("a");
					return;
				}

				PickupItem.SendToServer(serverId);
			}
		}
	}

	cachedResult = undefined;
}

export = PickUpItems;
