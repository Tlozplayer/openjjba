// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: MIT

import { GroupMotor, SingleMotor, Spring } from "@rbxts/flipper";
import { useDeltaTime, useHookState } from "@rbxts/matter";

type Motors = GroupMotor<number[]> | SingleMotor;
interface storage<T extends Motors> {
	motor?: T;
}

function cleanup<T extends Motors>(storage: storage<T>) {
	storage.motor?.destroy();
	print("cleanup");
}

export function useMotor(goal: Spring, initial?: number) {
	const storage = useHookState<storage<SingleMotor>>(cleanup);
	if (storage.motor === undefined) {
		storage.motor = new SingleMotor(initial === undefined ? 0 : initial);
	}

	storage.motor.setGoal(goal);
	storage.motor.step(useDeltaTime());

	return storage.motor.getValue();
}

export function useGroupMotor(goal: Spring[], initial: number[]) {
	const storage = useHookState<storage<GroupMotor<number[]>>>(cleanup);
	if (storage.motor === undefined) {
		storage.motor = new GroupMotor<number[]>(initial);
	}

	storage.motor.setGoal(goal);
	storage.motor.step(useDeltaTime());

	return storage.motor.getValue();
}
