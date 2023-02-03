// SPDX-FileCopyrightText: 2022 Ukendio
//
// SPDX-License-Identifier: MIT

// https://github.com/Ukendio/for-animia/blob/master/src/shared/systems/updateTransforms.ts
import { World } from "@rbxts/matter";
import { Renderable, Transform } from "shared/components";

function UpdateTransforms(world: World) {
	for (const [id, transformRecord] of world.queryChanged(Transform)) {
		if (!world.contains(id)) continue;
		if (transformRecord.new && !transformRecord.new._doNotReconcile) {
			const model = world.get(id, Renderable);

			if (model) {
				model.model.PivotTo(transformRecord.new.cframe);
			}
		}
	}

	for (const [id, renderableRecord] of world.queryChanged(Renderable)) {
		if (!world.contains(id)) {
			continue;
		}

		const transform = world.get(id, Transform);

		if (!transform) {
			continue;
		}

		if (renderableRecord.new) {
			renderableRecord.new.model.PivotTo(transform.cframe);
		}
	}

	for (const [id, { model }, { cframe }] of world.query(Renderable, Transform)) {
		if (model.PrimaryPart?.Anchored) {
			continue;
		}

		const existingCF = cframe;
		const currentCF = model.GetPivot();

		if (currentCF.Y < -400) {
			world.despawn(id);
			continue;
		}

		if (currentCF !== existingCF) {
			world.insert(id, Transform({ cframe: currentCF, _doNotReconcile: true }));
		}
	}
}

export = UpdateTransforms;
