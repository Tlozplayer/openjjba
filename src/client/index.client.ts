import { ReplicatedStorage } from "@rbxts/services";
import { CreateUIStore } from "shared/rodux/ui-store";
import { start } from "shared/start";
import { IClientState } from "shared/types/state";
import { CreateUI } from "./plugins/create-ui";
import { ReceiveReplication } from "./plugins/recieve-replication";

declare const script: { systems: Folder };
const state: IClientState = {
	debugEnabled: false,

	entityIdMap: new Map(),
	serverIdMap: new Map(),

	UIStore: CreateUIStore(),
};

start([script.systems, ReplicatedStorage.shared.systems], state)(ReceiveReplication, CreateUI);
