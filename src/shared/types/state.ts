import { AnyEntity } from "@rbxts/matter";

export interface IClientState {
	debugEnabled: boolean;

	entityIdMap: Map<string, AnyEntity>;
	serverIdMap: Map<AnyEntity, string>;
}

export interface IServerState {}
