// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { Hovered, ItemComponent } from "shared/components";
import { UpdatePickupUI } from "shared/rodux/ui-store/pickup-reducer";
import { ItemToName } from "shared/types/items";
import { IClientState } from "shared/types/state";

let olditemname = "";
function PickupUI(world: World, state: IClientState) {
	const [, , hoveredItem] = world.query(Hovered, ItemComponent).next();
	const itemName = hoveredItem ? ItemToName[hoveredItem.id] : olditemname;
	const position = UserInputService.GetMouseLocation();

	olditemname = itemName;

	state.UIStore.dispatch(
		UpdatePickupUI({
			HoveredName: olditemname,
			MousePosition: UDim2.fromOffset(position.X, position.Y),
			Visible: !(hoveredItem === undefined),
		}),
	);
}

export = { system: PickupUI, event: "render" };
