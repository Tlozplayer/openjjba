// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { CollectionService } from "@rbxts/services";
import * as Components from "shared/components";

function getId(instance: Instance): AnyEntity | void {
	const id = instance.GetAttribute("id");
	if (id !== undefined && typeIs(id, "number")) {
		return id as AnyEntity;
	}
}

export function UseTags(world: World) {
	function spawnBound(instance: Instance, component: ComponentCtor) {
		const attributeId = getId(instance);
		const id = attributeId !== undefined ? attributeId : world.spawn();
		world.insert(id, component());

		if (instance.IsA("Model")) {
			world.insert(id, Components.Renderable({ model: instance }));
		}

		instance.SetAttribute("id", id);
	}

	for (const [name, component] of pairs(Components)) {
		CollectionService.GetTagged(name).forEach((instance) => {
			spawnBound(instance, component);
		});

		CollectionService.GetInstanceAddedSignal(name).Connect((instance) => {
			spawnBound(instance, component);
		});

		CollectionService.GetInstanceRemovedSignal(name).Connect((instance) => {
			const id = getId(instance);
			if (id !== undefined) {
				world.despawn(id as AnyEntity);
			}
		});
	}
}
