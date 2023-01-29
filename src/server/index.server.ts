// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { start } from "shared/start";
import { ReplicatedStorage } from "@rbxts/services";
import { IServerState } from "shared/types/state";
import { LoadPlayerData } from "./plugins/load-player-data";
import { UseTags } from "./plugins/use-tags";
import { LoadCharaterRig } from "./plugins/load-character";
import Log, { Logger } from "@rbxts/log";
import { $package } from "rbxts-transform-debug";
import Zircon from "@rbxts/zircon";
import { InitZircon } from "./plugins/init-zircon";

declare const script: { systems: Folder; commands: Folder };

Log.SetLogger(
	Logger.configure().WriteTo(Zircon.Log.Console()).EnrichWithProperty("Version", $package.version).Create(),
);

const state: IServerState = {
	PlayerData: new Map(),
};

start([script.systems, ReplicatedStorage.shared.systems], state)(LoadPlayerData, UseTags, LoadCharaterRig, InitZircon);
