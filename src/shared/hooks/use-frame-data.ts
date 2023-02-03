// SPDX-FileCopyrightText: 2023 Christian Fletcher <mistrustfully@gmail.com>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { useHookState } from "@rbxts/matter";
import { FrameData } from "shared/types/frame-data";

export function useFrameData<T>(frame_data: FrameData<T>, discrim?: number) {
	const storage = useHookState<{ time: number; next: number }>(discrim);
	if (storage.time === undefined) {
		storage.time = os.time();
	}

	if (storage.next === undefined) {
		storage.next = -1;
	}

	if (frame_data[storage.next + 1] && frame_data[storage.next + 1][0] + storage.time < os.time()) {
		storage.next++;
		storage.time = os.time();
	}

	const data = frame_data[storage.next];
	if (data === undefined) {
		return undefined;
	} else {
		return data[1];
	}
}
