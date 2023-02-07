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
import { Item, ItemToModel } from "shared/types/items";
import { Stand } from "shared/types/stands";
import { IServerState } from "shared/types/state";

export const ItemNames: Item[] = [];
for (const [_, name] of pairs(Item)) {
	ItemNames.push(name);
}

export const ZrItems = new ZirconEnumBuilder("Items").FromArray(ItemNames);

export const StandNames: Stand[] = [];
for (const [_, name] of pairs(Stand)) {
	StandNames.push(name);
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
							const Item = ItemNames[item.getValue()];
							const ItemModel = ItemToModel[Item].Clone();

							world.spawn(ItemComponent({ id: Item }), Renderable({ model: ItemModel }));

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
								state.PlayerData.get(plr)!.dispatch({
									type: "SetStandAction",
									stand: { id: StandNames[stand.getValue()] },
								});
							}),
					)
					.Build(),
				[ZirconDefaultGroup.Creator],
			)
			.AddNamespace(
				new ZirconNamespaceBuilder("effects")
					.AddFunction(
						new ZirconFunctionBuilder("set_stand")
							.AddArgument("player")
							.AddArgument(ZrStands)
							.Bind((_, plr, stand) => {
								state.PlayerData.get(plr)!.dispatch({
									type: "SetStandAction",
									stand: { id: StandNames[stand.getValue()] },
								});
							}),
					)
					.Build(),
				[ZirconDefaultGroup.Creator],
			)

			.Build(),
	);
}
