import { start } from "shared/start";
import { ReplicatedStorage } from "@rbxts/services";
import { IServerState } from "shared/types/state";
import { LoadPlayerData } from "./plugins/load-player-data";

declare const script: { systems: Folder };
const state: IServerState = {};

start([script.systems, ReplicatedStorage.shared.systems], state)(LoadPlayerData);
