import Net from "@rbxts/net";
import { AnyComponent } from "@rbxts/matter";
import { ComponentNames } from "shared/types/serde";
import { Stand } from "./types/stands";

export type ComponentPayload = Map<string, Map<ComponentNames, { data: AnyComponent }>>;
const Remotes = Net.Definitions.Create({
	Replication: Net.Definitions.ServerToClientEvent<[ComponentPayload]>(),
	PickupItem: Net.Definitions.ClientToServerEvent<[string]>(),

	UseMove: Net.Definitions.ClientToServerEvent<[number]>(),
	RecieveMove: Net.Definitions.ServerToClientEvent<[Stand, number]>(),
	MoveCooldownEnded: Net.Definitions.ServerToClientEvent<[number]>(),
});

export default Remotes;
