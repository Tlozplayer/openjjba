import { AnyEntity } from "@rbxts/matter";
import { UIStore } from "shared/rodux/ui-store";

export interface IClientState {
	debugEnabled: boolean;

	entityIdMap: Map<string, AnyEntity>;
	serverIdMap: Map<AnyEntity, string>;

	UIStore: UIStore;
}

export interface IServerState {}
