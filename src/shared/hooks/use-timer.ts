// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: MIT

import { useHookState } from "@rbxts/matter";

type storage = {
	expiry: number;
	time: number;
};

function cleanup(storage: storage) {
	if (storage.expiry === undefined) return true;
	return os.clock() < storage.expiry;
}

/// Waits for `seconds` to elapse, then returns true.
/// Essentially useThrottle but doesn't start out as true.
export function useTimer(seconds: number, discriminator?: unknown) {
	const storage = useHookState(discriminator, cleanup);
	if (storage.time === undefined) {
		storage.time = os.clock();
	}

	if (os.clock() - storage.time >= seconds) {
		storage.time = os.clock();
		storage.expiry = os.clock() + seconds;
		return true;
	}

	return false;
}
