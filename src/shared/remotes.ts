import Net from "@rbxts/net";
import { AnyComponent } from "@rbxts/matter";
import { ComponentNames } from "shared/types/serde";

export type ComponentPayload = Map<string, Map<ComponentNames, { data: AnyComponent }>>;
const Remotes = Net.Definitions.Create({
	Replication: Net.Definitions.ServerToClientEvent<[ComponentPayload]>(),
	PickupItem: Net.Definitions.ClientToServerEvent<[string]>(),
});

export default Remotes;
