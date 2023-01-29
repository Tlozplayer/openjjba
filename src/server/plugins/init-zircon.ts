// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import Log from "@rbxts/log";
import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import {
	ZirconServer,
	ZirconConfigurationBuilder,
	ZirconDefaultGroup,
	ZirconNamespaceBuilder,
	ZirconFunctionBuilder,
	ZirconEnumBuilder,
} from "@rbxts/zircon";
import { ItemComponent, Renderable } from "shared/components";
import { Item, ItemToModel, ItemToName } from "shared/types/items";
import { Stand, StandToName } from "shared/types/stands";
import { IServerState } from "shared/types/state";

export const ItemNames: string[] = [];
for (const [id, name] of pairs(ItemToName)) {
	ItemNames[id] = name.gsub(" ", "")[0];
}

export const ZrItems = new ZirconEnumBuilder("Items").FromArray(ItemNames);

export const StandNames: string[] = [];
for (const [id, name] of pairs(StandToName)) {
	StandNames[id] = name.gsub(" ", "")[0];
}

export const ZrStands = new ZirconEnumBuilder("Stands").FromArray(StandNames);

export function InitZircon(world: World, state: IServerState) {
	ZirconServer.Registry.Init(
		new ZirconConfigurationBuilder()
			.CreateDefaultCreatorGroup()
			.CreateDefaultAdminGroup()
			.CreateDefaultUserGroup({ CanAccessConsole: true })
			.AddFunction(
				new ZirconFunctionBuilder("print").Bind((_, ...args) => {
					Log.Info(args.map((v) => tostring(v)).join(", "));
				}),
				[ZirconDefaultGroup.User],
			)

			.AddEnum(ZrItems, [ZirconDefaultGroup.Creator])
			.AddEnum(ZrStands, [ZirconDefaultGroup.Creator])

			.AddNamespace(
				new ZirconNamespaceBuilder("items")
					.AddFunction(
						new ZirconFunctionBuilder("spawn").AddArgument(ZrItems).Bind((_, item) => {
							const ItemModel = ItemToModel[item.getValue() as Item].Clone();

							world.spawn(
								ItemComponent({ id: item.getValue() as Item }),
								Renderable({ model: ItemModel }),
							);

							ItemModel.MoveTo(Vector3.zero);
							ItemModel.Parent = Workspace;

							return true;
						}),
					)
					.Build(),
				[ZirconDefaultGroup.Creator],
			)
			.AddNamespace(
				new ZirconNamespaceBuilder("stands")
					.AddFunction(
						new ZirconFunctionBuilder("set_stand")
							.AddArgument("player")
							.AddArgument(ZrStands)
							.Bind((_, plr, stand) => {
								print(StandToName[stand.getValue() as Stand]);
								state.PlayerData.get(plr)!.dispatch({
									type: "SetStandAction",
									stand: { id: stand.getValue() },
								});
							}),
					)
					.Build(),
				[ZirconDefaultGroup.Creator],
			)

			.Build(),
	);
}
