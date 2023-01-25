// SPDX-FileCopyrightText: 2022 Ukendio
//
// SPDX-License-Identifier: MIT

/// Based on https://github.com/Ukendio/for-animia/blob/master/src/shared/start.ts

import { Debugger, Loop, World, AnySystem } from "@rbxts/matter";
import { RunService, UserInputService } from "@rbxts/services";
import { Context, HotReloader } from "@rbxts/rewire";
import Plasma from "@rbxts/plasma";
//import { ChickynoidClient, ChickynoidServer } from "./chickynoid/types";
import { Renderable } from "./components";
import { IClientState } from "shared/types/state";

export function start<S extends object>(
	containers: Array<Instance>,
	state: S,
): (...plugins: Array<(world: World, state: S) => void>) => World {
	const world = new World();

	const myDebugger = new Debugger(Plasma);

	myDebugger.findInstanceFromEntity = (id): Model | undefined => {
		if (!world.contains(id)) return;

		const model = world.get(id, Renderable);

		if (model) {
			return model.model;
		} else {
			return undefined;
		}
	};

	myDebugger.authorize = (player): boolean => {
		return player.UserId === 1091164489 || player.UserId === 1079012804 || RunService.IsStudio();
	};

	const loop = new Loop(world, state, myDebugger.getWidgets());

	const hotReloader = new HotReloader();

	let firstRunSystems = new Array<AnySystem>();
	const systemsByModule = new Map<ModuleScript, AnySystem>();

	function loadModule(mod: ModuleScript, ctx: Context): void {
		const originalModule = ctx.originalModule;

		const [ok, system] = pcall(require, mod) as LuaTuple<[boolean, AnySystem]>;

		if (!ok) {
			warn("Error when hot-reloading system", mod.Name, system);
			return;
		}

		if (firstRunSystems) {
			firstRunSystems.push(system as AnySystem);
		} else if (systemsByModule.has(originalModule)) {
			loop.replaceSystem(systemsByModule.get(originalModule)!, system);
			myDebugger.replaceSystem(systemsByModule.get(originalModule)!, system);
		} else loop.scheduleSystem(system);

		systemsByModule.set(originalModule, system);
	}

	function unloadModule(_: ModuleScript, ctx: Context): void {
		if (ctx.isReloading) return;

		const originalModule = ctx.originalModule;
		if (systemsByModule.has(originalModule)) {
			loop.evictSystem(systemsByModule.get(originalModule)!);
			systemsByModule.delete(originalModule);
		}
	}

	containers.forEach((container) => hotReloader.scan(container, loadModule, unloadModule));

	loop.scheduleSystems(firstRunSystems);
	firstRunSystems = undefined!;

	myDebugger.autoInitialize(loop);

	const events: {
		default: RBXScriptSignal;
		render?: RBXScriptSignal;
	} = RunService.IsClient()
		? {
				render: RunService.RenderStepped,
				default: RunService.Heartbeat,
		  }
		: { default: RunService.Heartbeat };

	loop.begin(events);

	//let chickynoid: typeof ChickynoidClient | typeof ChickynoidServer = ChickynoidClient;
	if (RunService.IsClient()) {
		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.F4) {
				myDebugger.toggle();
				(state as IClientState).debugEnabled = myDebugger.enabled;
			}
		});
	} else {
		//chickynoid = ChickynoidServer;
		//chickynoid.RecreateCollisions(Workspace);
	}

	//(chickynoid as typeof ChickynoidClient & typeof ChickynoidServer).Setup();

	return function (...plugins: Array<(world: World, state: S) => void>): World {
		for (const plugin of plugins) {
			plugin(world, state);
		}

		return world;
	};
}
