// SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: MIT

import { useHookState } from "@rbxts/matter";

type storage<T> = { old?: T; newest?: T };

export function useChanged<T>(newest?: T, discrim?: unknown) {
	const storage = useHookState<storage<T>>(discrim);
	storage.old = storage.newest;
	storage.newest = newest;

	return [storage.newest, storage.old];
}
