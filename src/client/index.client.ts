import { ReplicatedStorage } from "@rbxts/services";
import { start } from "shared/start";
import { IClientState } from "shared/types/state";
import { ReceiveReplication } from "./plugins/recieve-replication";

declare const script: { systems: Folder };
const state: IClientState = {
	debugEnabled: false,

	entityIdMap: new Map(),
	serverIdMap: new Map(),
};

start([script.systems, ReplicatedStorage.shared.systems], state)(ReceiveReplication);
